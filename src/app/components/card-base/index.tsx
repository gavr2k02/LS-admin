import style from './style.module.scss';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { getPatchOnType } from '../../common/utils/getPatchOnType';
import { IBaseCard } from 'models/interfaces/IBaseCard';
import { Link } from 'react-router-dom';

interface IBaseCardPopups {
  value: IBaseCard;
  type: CardTypePopup;
  facultyId?: string;
  isPreview?: boolean;
}

export default function CardBase({ value, type, facultyId, isPreview = false }: IBaseCardPopups) {
  const name = value.name.length < 16 ? value.name : value.name.slice(0, 16) + '...';
  let facultiesString: string;

  if (isPreview) {
    return (
      <div className={style.cardFaculty}>
        <div className={style.link}>
          <div class={style.name}>{name}</div>
          <div class={style.name}>{facultiesString}</div>
        </div>
        <div class={style.editPanel} style={{ backgroundColor: value.color }}></div>
      </div>
    );
  } else {
    return (
      <Link to={getPatchOnType(type, value, facultyId)} className={style.cardFaculty}>
        <div className={style.link}>
          <div class={style.name}>{name}</div>
          <div class={style.name}>{facultiesString}</div>
        </div>
        <div class={style.editPanel} style={{ backgroundColor: value.color }}></div>
      </Link>
    );
  }
}
