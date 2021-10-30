import { RestService } from '../rest-serive/RestService';
import { IGroupsService } from './IGroupsService';
import Pubnub from 'pubnub';
import { IGroup } from 'models/interfaces/IGroup';
import { validateCardData } from '../../../common/utils/validateCardData';
import { baseCardHandler } from '../../../common/utils/baseCardDataHandler';
import { Subject } from 'rxjs';
import { api } from '..';
import { baseCardHandlerBase } from '../../../common/utils/baseCardDataHandlerBase';

export class GroupsService extends RestService<IGroup> implements IGroupsService {
  private _groups: IGroup[] = [];
  private _search: string = '';
  private _hash: Record<string, IGroup>;

  constructor() {
    super();
  }

  public async getGroups(facultyId: string): Promise<void> {
    const result: IGroup[] = await this.get(`groups/${facultyId}`);
    this._groups = result;
    this.searchHandler(this._groups);
  }

  public async getGroupById(groupId: string): Promise<IGroup> {
    return this.get(`group/${groupId}`);
  }

  public async getGroupByIdFullData(groupId: string): Promise<IGroup> {
    return this.get(`group/full/${groupId}`);
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
    this.searchHandler(this._groups);
  }

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: IGroup = data.message;

    if (!value) {
      return;
    }

    this.groupHandler(value);
  }

  private groupHandler(value: IGroup): void {
    const updatedData = baseCardHandlerBase(value, this._groups) as IGroup[];
    if (!updatedData?.length || !updatedData) {
      return;
    }

    if (this._search.length) {
      this.searchHandler(updatedData);
    } else {
      this.next(updatedData);
    }
    this._groups = updatedData;
  }

  private searchHandler(value: IGroup[]): void {
    const filtredData = value.filter((item) => item.name.toLowerCase().includes(this._search.toLowerCase()));
    this.next(filtredData);
  }

  public get groups(): Subject<IGroup[]> {
    return this.subject as Subject<IGroup[]>;
  }
}
