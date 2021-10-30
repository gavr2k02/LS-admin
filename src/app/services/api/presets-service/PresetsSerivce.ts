import { RestService } from '../rest-serive/RestService';
import { IPresetsService } from './IPresetsService';
import Pubnub from 'pubnub';
import { validateCardData } from '../../../common/utils/validateCardData';
import { Subject } from 'rxjs';
import { IPreset } from 'models/interfaces/IPreset';
import { baseCardHandlerBase } from '../../../common/utils/baseCardDataHandlerBase';
import { api } from '..';

export class PresetsService extends RestService<IPreset> implements IPresetsService {
  private _presets: IPreset[] = [];
  private _search: string = '';

  constructor() {
    super();
  }

  public async getPresets(courseId: string): Promise<void> {
    const result: IPreset[] = await this.get(`presets/${courseId}`);
    this._presets = result || [];
    this.searchHandler(this._presets);
  }

  public async getById(id: string): Promise<IPreset> {
    return this.get(`presets/${id}`);
  }

  public async create(value: IPreset): Promise<void> {
    validateCardData(value, this._presets);

    const result: IPreset = await this.post('presets', value);
    this.valueHandler(result);
  }

  public async deletePreset(id: string): Promise<void> {
    const result: IPreset = await this.delete(`presets/${id}`);
    this.valueHandler(result);
  }

  public async update(value: IPreset): Promise<void> {
    validateCardData(value, this._presets);

    const result: IPreset = await this.patch('presets', value);
    this.valueHandler(result);
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
    this.searchHandler(this._presets);
  }

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: IPreset = data.message;

    if (!value) {
      return;
    }

    this.valueHandler(value);
  }

  private valueHandler(value: IPreset): void {
    const updatedData = baseCardHandlerBase(value, this._presets) as IPreset[];
    if (!updatedData?.length || !updatedData) {
      return;
    }
    if (this._search.length) {
      this.searchHandler(updatedData);
    } else {
      this.next(updatedData);
    }
    this._presets = updatedData;
  }

  private searchHandler(value: IPreset[]): void {
    const filtredData = value.filter((item) => item.name.includes(this._search));
    this.next(filtredData);
  }

  public get presets(): Subject<IPreset[]> {
    return this.subject as Subject<IPreset[]>;
  }
}
