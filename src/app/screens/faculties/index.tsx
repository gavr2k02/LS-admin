import CardBase from '../../components/card-base';
import Loading from '../loading';

import { IFaculty } from 'models/interfaces/IFaculty';
import { useState, useEffect } from 'preact/hooks';
import { api } from '../../services/api';
import { useObservable } from '../../common/utils/useObservable';

import style from './style.module.scss';
import { CardTypePopup } from '../../common/enums/CardTypePopup';

export default function Faculties() {
  const [loading, setLoading] = useState(true);
  const faculties: IFaculty[] = useObservable(api.facultiesService.faculties);

  useEffect(() => {
    getFaculties();
    api.facultiesService.subscribe(`${api.authService.user.cid}-faculties`);
    return () => {
      api.facultiesService.unsubscribe(`${api.authService.user.cid}-faculties`);
    };
  }, []);

  const getFaculties = async () => {
    try {
      await api.facultiesService.getFaculties();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div class={style.faculty}>
        <div class={style.header}>
          <div class={style.text}>Faculties</div>
        </div>
        <div class={style.cardsContainer}>
          {faculties?.map((data) => (
            <CardBase value={data} type={CardTypePopup.FACULTY} />
          ))}
        </div>
      </div>
    );
  }
}
