import { IDayLessonTeacher } from 'models/interfaces/IDayLessonTeacher';

export interface ITimetableDayService {
  getTimeTableWeekTeacher(dateString: string): Promise<IDayLessonTeacher[]>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
