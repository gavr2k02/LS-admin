import { IFaculty } from 'models/interfaces/IFaculty';
import { Subject } from 'rxjs';

export interface IFacultiesService {
  faculties: Subject<IFaculty[]>;
  setSearch(value: string): void;
  getFaculties(): Promise<void>;
  getFacultyById(facultyId: string): Promise<IFaculty>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
