import { ILoginPassword } from 'models/interfaces/ILoginPassword';
import { ISignUpPaasword } from 'models/interfaces/ISignUpPaasword';
import { ITeacher } from 'models/interfaces/ITeacher';
import { Subject } from 'rxjs';

export interface IAuthService {
  token: string;
  isLoggedIn: boolean;
  user: ITeacher;
  userSubject: Subject<ITeacher>;
  cid: string;

  loginWithToken(): Promise<void>;
  loginWithPassword(data: ILoginPassword): Promise<void>;
  signUpWithPassword(data: ISignUpPaasword): Promise<void>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
