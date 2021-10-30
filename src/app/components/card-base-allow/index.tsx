import style from './style.module.scss';
import { Link } from 'react-router-dom';
import BoundedTooltip from '../popups/bounded-tooltip';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { getPatchOnType } from '../../common/utils/getPatchOnType';
import menu from '../../assets/img/menu2.svg';
import { IBaseCard } from 'models/interfaces/IBaseCard';

interface IBaseCardPopups {
  value: IBaseCard;
  type: CardTypePopup;
  isPreview?: boolean;
  facultyId?: string;
  isSelected?: boolean;
}

export default function CardBaseAllow({
  value,
  type,
  isPreview = false,
  isSelected = false,
  facultyId,
}: IBaseCardPopups) {
  const name = value.name.length < 16 ? value.name : value.name.slice(0, 16) + '...';
  return (
    <div className={style.card} style={isSelected && { backgroundColor: '#818181' }}>
      {isPreview ? (
        <>
          <div className={style.link}>
            <div class={style.name}>{name}</div>
          </div>

          <div class={style.editPanel} style={{ backgroundColor: value.color }}>
            <img class={style.menuIcon} src={menu} />
          </div>
        </>
      ) : (
        <>
          <Link className={style.link} to={getPatchOnType(type, value, facultyId)}>
            <div class={style.name}>{name}</div>
          </Link>

          <div class={style.editPanel} style={{ backgroundColor: value.color }}>
            <BoundedTooltip value={value} type={type} />
          </div>
        </>
      )}
    </div>
  );
}
