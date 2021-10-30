import { Subject } from 'rxjs';
import { ICourse } from 'models/interfaces/ICourse';

export interface ICoursesService {
  courses: Subject<ICourse[]>;
  setSearch(value: string): void;
  getCourses(facultyId: string): Promise<void>;
  getCourseById(courseId: string): Promise<ICourse>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
