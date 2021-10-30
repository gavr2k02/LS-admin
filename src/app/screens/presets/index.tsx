import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import HeaderBaseCard from '../../components/header-base-card';
import { useObservable } from '../../common/utils/useObservable';
import { api } from '../../services/api';
import { useEffect, useState } from 'preact/hooks';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import Loading from '../loading';
import { defaultCard } from '../../common/constans/constans';

import CardPopup from '../../components/popups/card-popup';
import Swal from 'sweetalert2';
import { IFaculty } from 'models/interfaces/IFaculty';
import { ICourse } from 'models/interfaces/ICourse';
import { IBaseCard } from 'models/interfaces/IBaseCard';
import CardBaseAllow from '../../components/card-base-allow';
import { IPreset } from 'models/interfaces/IPreset';
import Faculties from '../faculties';
import Cards from '../cards';

interface IParamsGroup {
  facultyId: string;
  courseId: string;
  presetId: string;
}

export default function Presets() {
  const { courseId, facultyId, presetId } = useParams() as IParamsGroup;

  const [course, setCourse] = useState<ICourse>();
  const [faculty, setFaculty] = useState<IFaculty>();
  const [loading, setLoading] = useState(true);

  const presets: IPreset[] = useObservable(api.presetsService.presets);

  useEffect(() => {
    getData();
    api.presetsService.subscribe(`${api.authService.cid}-presets-${api.authService.user.id}`);
    return () => {
      api.presetsService.unsubscribe(`${api.authService.cid}-presets-${api.authService.user.id}`);
    };
  }, []);

  const getData = async () => {
    try {
      const [zero, course, faculty] = await Promise.all([
        api.presetsService.getPresets(courseId),
        api.coursesService.getCourseById(courseId),
        api.facultiesService.getFacultyById(facultyId),
      ]);
      setCourse(course);
      setFaculty(faculty);
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
      <div class={style.main}>
        <div class={style.header}>
          <div class={style.text}>
            <CardPopup type={CardTypePopup.PRESET} value={{ ...defaultCard, courseId } as IBaseCard} isCreate={true} />
            Presets
          </div>
          <div class={style.cardsContainer}>
            {course && <HeaderBaseCard value={course} type={CardTypePopup.COURSE} facultyId={facultyId} />}
            {faculty && <HeaderBaseCard value={faculty} type={CardTypePopup.FACULTY} />}
          </div>
        </div>
        <div class={style.cardsContainer}>
          <div class={style.cardsVerticalContainer}>
            {presets?.map((data) => (
              <CardBaseAllow
                value={data}
                type={CardTypePopup.PRESET}
                facultyId={facultyId}
                isSelected={presetId === data.id}
              />
            ))}
          </div>
          <Cards />
        </div>
      </div>
    );
  }
}
