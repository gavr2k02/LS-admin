import { RestService } from '../rest-serive/RestService';
import { ITimetableDayService } from './ITimetableDayService';
import Pubnub from 'pubnub';
import { IDayLessonTeacher } from 'models/interfaces/IDayLessonTeacher';

export class TimetableDayService extends RestService<IDayLessonTeacher> implements ITimetableDayService {
  private _dayLessons: IDayLessonTeacher[] = [];

  constructor() {
    super();
  }

  public async getTimeTableWeekTeacher(dateString: string): Promise<IDayLessonTeacher[]> {
    return this.get(`timetable/week/teacher/${dateString}`);
  }

  public subscribe(channel: string): void {
    this.pubnub.subscribe({ channels: [channel] });
    this.pubnub.addListener({
      message: this.pubnunHandler.bind(this),
    });
  }

  public unsubscribe(channel: string): void {}

  private pubnunHandler(data: Pubnub.MessageEvent): void {}
}
