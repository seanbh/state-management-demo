import { User } from '../user';

export namespace UserActions {
  export class Login {
    static readonly type = '[User Page] - Login';
    constructor(public userName: string) {}
  }
  export class Logout {
    static readonly type = '[User Page] - Logout';
  }
}
