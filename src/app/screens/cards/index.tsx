import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import { useObservable } from '../../common/utils/useObservable';
import { api } from '../../services/api';
import { useEffect, useState } from 'preact/hooks';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import Loading from '../loading';
import { defaultCard } from '../../common/constans/constans';

import CardPopup from '../../components/popups/card-popup';
import Swal from 'sweetalert2';
import { IBaseCard } from 'models/interfaces/IBaseCard';
import CardBaseAllow from '../../components/card-base-allow';
import { IPreset } from 'models/interfaces/IPreset';

interface IParamsGroup {
  facultyId: string;
  courseId: string;
  presetId: string;
}

export default function Cards() {
  const { presetId } = useParams() as IParamsGroup;

  const [loading, setLoading] = useState(false);

  // const presets: IPreset[] = useObservable(api.presetsService.presets);

  useEffect(() => {
    // getData();
    api.presetsService.subscribe(`${api.authService.cid}-presets-${api.authService.user.id}`);
    return () => {
      api.presetsService.unsubscribe(`${api.authService.cid}-presets-${api.authService.user.id}`);
    };
  }, []);

  // const getData = async () => {
  //   try {
  //     const [zero] = await Promise.all([api.presetsService.getPresets(presetId)]);
  //   } catch (e) {
  //     Swal.fire('Error', 'Opps... Sometime went wrong', 'error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return (
      <div style={{ width: '80%', height: '80vh' }}>
        <Loading minScrin={true} />
      </div>
    );
  } else {
    return (
      <div class={style.main}>
        <div class={style.header}>
          <div class={style.text}>
            <CardPopup type={CardTypePopup.PRESET} value={{ ...defaultCard, presetId } as IBaseCard} isCreate={true} />
            Cards
          </div>
        </div>
        <div class={style.cardsContainer}>
          {/* {presets?.map((data) => (
            <CardBaseAllow value={data} type={CardTypePopup.PRESET} />
          ))} */}
        </div>
      </div>
    );
  }
}
