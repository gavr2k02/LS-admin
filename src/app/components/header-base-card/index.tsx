import style from './style.module.scss';
import { Link } from 'react-router-dom';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { getPatchOnTypeHeader } from '../../common/utils/getPatchOnTypeHeader';
import { IBaseCard } from 'models/interfaces/IBaseCard';

interface IFacultyProps {
  value: IBaseCard;
  type: CardTypePopup;
  facultyId?: string;
}

export default function HeaderBaseCard({ value, type, facultyId }: IFacultyProps) {
  return (
    <Link className={style.cardFacultyHeader} to={getPatchOnTypeHeader(type, value, facultyId)}>
      <div class={style.name}>{value.name}</div>
      <div class={style.editPanel} style={{ backgroundColor: value.color }}></div>
    </Link>
  );
}
