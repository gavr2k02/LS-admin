import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import HeaderBaseCard from '../../components/header-base-card';
import { useObservable } from '../../common/utils/useObservable';
import { api } from '../../services/api';
import { useEffect, useState } from 'preact/hooks';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import Loading from '../loading';

import Swal from 'sweetalert2';
import { IFaculty } from 'models/interfaces/IFaculty';
import CardBase from '../../components/card-base';
import { ICourse } from 'models/interfaces/ICourse';

interface IParamsGroup {
  facultyId: string;
}

export default function Courses() {
  const { facultyId } = useParams() as IParamsGroup;
  const [faculty, setFaculty] = useState<IFaculty>();
  const [loading, setLoading] = useState(true);
  const courses: ICourse[] = useObservable(api.coursesService.courses);

  useEffect(() => {
    getData();
    api.coursesService.subscribe(`${api.authService.cid}-courses`);
    return () => {
      api.coursesService.unsubscribe(`${api.authService.cid}-courses`);
    };
  }, []);

  const getData = async () => {
    try {
      const [zero, result] = await Promise.all([
        api.coursesService.getCourses(facultyId),
        api.facultiesService.getFacultyById(facultyId),
      ]);
      setFaculty(result);
    } catch (e) {
      Swal.fire('Error', 'Opps... Sometime went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div class={style.group}>
        <div class={style.header}>
          <div class={style.text}>Courses</div>
          {faculty && <HeaderBaseCard value={faculty} type={CardTypePopup.FACULTY} />}
        </div>
        <div class={style.cardsContainer}>
          {courses?.map((data) => (
            <CardBase value={data} type={CardTypePopup.COURSE} facultyId={facultyId} />
          ))}
        </div>
      </div>
    );
  }
}
