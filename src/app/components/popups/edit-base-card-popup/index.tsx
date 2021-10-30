import { useState } from 'preact/hooks';
import ReinventedColorWheel from 'reinvented-color-wheel/react';

import style from './style.module.scss';
import 'reinvented-color-wheel/css/reinvented-color-wheel.min.css';

import CardBase from '../../card-base';
import Spinner from '../../spinner';

import { api } from '../../../services/api';
import Swal from 'sweetalert2';
import { CardTypePopup } from '../../../common/enums/CardTypePopup';
import { defaultCard } from '../../../common/constans/constans';
import { IBaseCard } from 'models/interfaces/IBaseCard';
import { IPreset } from 'models/interfaces/IPreset';
import CardBaseAllow from '../../card-base-allow';

interface IEditBaseCardPopupProps {
  value: IBaseCard | undefined;
  onClose: () => void;
  isCreate: boolean;
  type: CardTypePopup;
}

export default function EditBaseCardPopup({ value, onClose, isCreate, type }: IEditBaseCardPopupProps) {
  const [data, setData] = useState<IBaseCard>(value);
  const [loading, setLoading] = useState(false);

  const createCardHanler = async () => {
    try {
      setLoading(true);
      switch (type) {
        case CardTypePopup.PRESET: {
          console.log(data);
          isCreate
            ? await api.presetsService.create(data as IPreset)
            : await api.presetsService.update(data as IPreset);
          break;
        }
      }
      onClose();
    } catch (e) {
      Swal.fire('Error', `${e}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div class={style.conatainer}>
        <label class={style.label}>Name:</label>
        <input
          class={style.field}
          type='text'
          value={data.name}
          onChange={(e) => setData({ ...data, name: (e.target as HTMLTextAreaElement).value })}
        />
        <label class={style.label}>Color:</label>
        <input
          class={style.field}
          type='text'
          value={data.color}
          onChange={(e) => setData({ ...data, color: (e.target as HTMLTextAreaElement).value })}
        />

        <div class={style.preview}>
          <div>
            <label class={style.label}>Preview:</label>
            <CardBaseAllow value={data} type={type} isPreview={true} />
          </div>
          <div class={style.whellColor}>
            <ReinventedColorWheel
              hex={data.color}
              wheelDiameter={200}
              wheelThickness={20}
              handleDiameter={16}
              wheelReflectsSaturation
              onChange={({ hex }) => setData({ ...data, color: hex })}
            />
          </div>
        </div>
        <div class={style.buttons}>
          <button class={style.buttonAdd} onClick={(e) => createCardHanler()}>
            {isCreate ? 'Create' : 'Update'}
          </button>
          <button class={style.buttonCanel} onClick={() => onClose()}>
            Canel
          </button>
        </div>
      </div>
    </>
  );
}
