import style from './style.module.scss';
import { useEffect, useState } from 'preact/hooks';
import { MONTHS, YEARS } from '../../common/constans/date';
import TimeTableDay from '../../components/timetable-day';
import { IDayLessonTeacher } from 'models/interfaces/IDayLessonTeacher';
import Loading from '../loading';
import Swal from 'sweetalert2';
import { api } from '../../services/api';
import { toDateString } from '../../common/utils';

export default function Timetable() {
  const [daysLessonsTeacher, setDaysLessonsTeacher] = useState<IDayLessonTeacher[]>();
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().substr(0, 10));
  const [loading, setLoading] = useState(true);

  const dataHandler = (value: string) => {
    console.log(value);
    setSelectedDate(value);
    getData(value);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async (date?: string) => {
    try {
      setLoading(true);
      const result: IDayLessonTeacher[] = await api.timeTableService.getTimeTableWeekTeacher(
        toDateString(new Date(date || selectedDate)),
      );
      setDaysLessonsTeacher(result);
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
          <div class={style.text}>Timetable</div>
          <div class={style.containerDate}>
            <input
              type='date'
              class={`${style.field} ${style.select}`}
              style={{ height: '10%' }}
              value={selectedDate}
              onChange={(e) => dataHandler((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
        <div class={style.cardsContainer}>
          {daysLessonsTeacher?.map((item) => (
            <TimeTableDay dayLesson={item} />
          ))}
        </div>
      </div>
    );
  }
}
