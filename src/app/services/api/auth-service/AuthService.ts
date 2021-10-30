import { ITeacher } from 'models/interfaces/ITeacher';
import { ILoginPassword } from 'models/interfaces/ILoginPassword';
import { ISignUpPaasword } from 'models/interfaces/ISignUpPaasword';
import { RestService } from '../rest-serive/RestService';
import { IAuthService } from './IAuthService';
import { IAuthResponce } from '../../../common/interfaces/auth/IAuthResponce';
import Pubnub from 'pubnub';
import { Subject } from 'rxjs';

export class AuthService extends RestService<ITeacher> implements IAuthService {
  private _user: ITeacher;

  constructor() {
    super();
  }

  public async loginWithToken(): Promise<void> {
    const result: IAuthResponce = await this.post('auth/login/token');
    this._user = result.user;
  }

  public async loginWithPassword(data: ILoginPassword): Promise<void> {
    const result: IAuthResponce = await this.post('auth/login/password/admin', data);
    this.saveToken(result.token);
    this._user = result.user;
  }

  public async signUpWithPassword(data: ISignUpPaasword): Promise<void> {
    const result: IAuthResponce = await this.post('auth/signup/password', data);
    this.saveToken(result.token);
    this._user = result.user;
  }

  private saveToken(token: string): void {
    localStorage.setItem('token-learning-service-admin', token);
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

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: ITeacher = data.message;
    console.log('va', value);
    if (!value) {
      return;
    }

    this._user = value;
  }

  public get token(): string {
    return localStorage.getItem('token-learning-service-admin');
  }

  public get isLoggedIn(): boolean {
    return !!this._user?.id;
  }

  public get user(): ITeacher {
    return this._user;
  }

  public get cid(): string {
    return this._user?.cid;
  }

  public get userSubject(): Subject<ITeacher> {
    return this.subject as Subject<ITeacher>;
  }
}
