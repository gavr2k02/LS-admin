import { Subject } from 'rxjs';
import { IPreset } from 'models/interfaces/IPreset';

export interface IPresetsService {
  presets: Subject<IPreset[]>;
  setSearch(value: string): void;
  getPresets(courseId: string): Promise<void>;
  getById(courseId: string): Promise<IPreset>;
  create(value: IPreset): Promise<void>;
  deletePreset(courseId: string): Promise<void>;
  update(value: IPreset): Promise<void>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
