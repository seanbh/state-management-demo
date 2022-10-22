import { Selector } from '@ngxs/store';
import { UserState, UserStateModel } from './user.state';

export class UserSelectors {
  @Selector([UserState])
  static currentUser(state: UserStateModel) {
    return state.currentUser;
  }

  @Selector([UserState])
  static isLoggedIn(state: UserStateModel) {
    return !!state.currentUser;
  }
}
