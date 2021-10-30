import Popup from 'reactjs-popup';

import style from './style.module.scss';
import 'reactjs-popup/dist/index.css';

import buttonAdd from '../../../assets/img/buttonAdd.svg';

import { IFaculty } from 'models/interfaces/IFaculty';
import { CardTypePopup } from '../../../common/enums/CardTypePopup';
import EditBaseCardPopup from '../edit-base-card-popup';
import { IBaseCard } from 'models/interfaces/IBaseCard';

interface IGroupProps {
  value?: IBaseCard | undefined;
  type: CardTypePopup;
  isCreate: boolean;
}

const styleContent = {
  height: undefined,
  width: '40%',
  borderRadius: '15px',
  backgroundColor: '#282828',
  border: 0,
  padding: '1vw',
};

export default function CardPopup({ value, type, isCreate }: IGroupProps) {
  styleContent.height = type === CardTypePopup.COURSE ? '90%' : '67%';

  return (
    <Popup
      contentStyle={styleContent}
      trigger={
        isCreate ? <img src={buttonAdd} class={style.buttonAdd} /> : <button class={style.buttonEdit}>Edit</button>
      }
      modal
      nested
    >
      {(close) => <EditBaseCardPopup value={value} onClose={close} isCreate={isCreate} type={type} />}
    </Popup>
  );
}
