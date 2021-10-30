import { useState } from 'preact/hooks';
import style from './style.module.scss';
import { Link } from 'react-router-dom';
import teachers from '../../assets/img/teacher.svg';
import Popup from 'reactjs-popup';
import { Routes } from '../../common/enums/Routes';

interface IIconData {
  url: string;
  patch: string;
  message: string;
  header: string;
}

const iconsData: IIconData[] = [
  { url: teachers, patch: Routes.FACULTIES, header: 'header', message: 'message message' },
  { url: teachers, patch: Routes.TIMETABLE, header: 'TIME', message: 'message message' },
];

const styleContent = {
  height: '10%',
  width: '10%',
  borderRadius: '2rem',
  backgroundColor: '#282828',
  border: 0,
  padding: '1vw',
};

export default function DownMenu() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      class={`${style.downMenu} ${showMenu && style.downMenuShow}`}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      {showMenu &&
        iconsData.map((iconData) => (
          <Popup
            contentStyle={styleContent}
            trigger={
              <Link to={iconData.patch} className={style.icon}>
                <img src={iconData.url} />
              </Link>
            }
            on='hover'
            position='top center'
            closeOnDocumentClick
          >
            <div class={style.helper}>
              <div class={style.header}>{iconData.header}</div>
              <div class={style.message}>{iconData.message}</div>
            </div>
          </Popup>
        ))}
    </div>
  );
}
