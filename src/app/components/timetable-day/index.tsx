import style from './style.module.scss';
import { IDayLessonTeacher } from 'models/interfaces/IDayLessonTeacher';
import { dateStringToDate } from '../../common/utils';

export interface ITimeTableDayProps {
  dayLesson: IDayLessonTeacher;
}

export default function TimeTableDay({ dayLesson }: ITimeTableDayProps) {
  const currentDate = dateStringToDate(dayLesson.date);
  return (
    <div class={`${style.baseForm} ${currentDate.toDateString() === new Date().toDateString() && style.currentDate}`}>
      <h2 class={style.header}>{currentDate.toDateString()}</h2>
      <table class={style.table}>
        {dayLesson?.lessons?.length ? (
          <>
            <tr>
              <th class={style.lineHead}>Time</th>
              <th class={style.lineHead}>Course</th>
              <th class={style.lineHead}>Group</th>
            </tr>
            {dayLesson.lessons?.map((item) => {
              return (
                <tr>
                  <td class={`${style.line} ${style.time}`}>{item.fullTime || ' '}</td>
                  <td class={`${style.line} ${style.field}`}>{item.courseName || ' '}</td>
                  <td class={`${style.line} ${style.field}`}>{item.groupName || ' '}</td>
                </tr>
              );
            })}
          </>
        ) : (
          <div class={style.none}>NONE</div>
        )}
      </table>
    </div>
  );
}
