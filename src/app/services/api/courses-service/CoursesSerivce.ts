import { RestService } from '../rest-serive/RestService';
import { ICoursesService } from './ICoursesService';
import Pubnub from 'pubnub';
import { baseCardHandler } from '../../../common/utils/baseCardDataHandler';
import { Subject } from 'rxjs';
import { ICourse } from 'models/interfaces/ICourse';
import { filterDataById } from '../../../common/utils/filterDataById';
import { api } from '..';

export class CoursesSerivce extends RestService<ICourse> implements ICoursesService {
  private _courses: ICourse[] = [];
  private _search: string = '';

  constructor() {
    super();
  }

  public async getCourses(facultyId: string): Promise<void> {
    const result: ICourse[] = await this.get(`courses/faculty/${facultyId}`);
    this._courses = filterDataById(result, api.authService.user.courseIds);
    this.searchHandler(this._courses);
  }

  public async getCourseById(courseId: string): Promise<ICourse> {
    return this.get(`course/${courseId}`);
  }

  public subscribe(channel: string): void {
    this.pubnub.subscribe({ channels: [channel] });
    this.pubnub.addListener({
      message: this.pubnunHandler.bind(this),
    });
  }

  public unsubscribe(channel: string): void {
    this.pubnub.unsubscribe({ channels: [channel] });
  }

  public setSearch(value: string): void {
    this._search = value;
    this.searchHandler(this._courses);
  }

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: ICourse = data.message;

    if (!value) {
      return;
    }

    this.courseHandler(value);
  }

  private courseHandler(value: ICourse): void {
    const updatedData = baseCardHandler(value, this._courses, api.authService.user.courseIds) as ICourse[];
    if (!updatedData?.length || !updatedData) {
      return;
    }
    if (this._search.length) {
      this.searchHandler(updatedData);
    } else {
      this.next(updatedData);
    }
    this._courses = updatedData;
  }

  private searchHandler(value: ICourse[]): void {
    const filtredData = value.filter((item) => item.name.includes(this._search));
    this.next(filtredData);
  }

  public get courses(): Subject<ICourse[]> {
    return this.subject as Subject<ICourse[]>;
  }
}
