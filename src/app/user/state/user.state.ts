import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { User } from '../user';
import { UserActions } from './user.actions';

export interface UserStateModel {
  currentUser: User | null;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    currentUser: null,
  },
})
@Injectable()
export class UserState {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  @Action(UserActions.Login)
  login(ctx: StateContext<UserStateModel>, action: { userName: string }) {
    this.authService
      .login(action.userName)
      .pipe(
        tap((user) => {
          ctx.setState((state) => ({
            ...state,
            currentUser: user,
          }));
          this.ngZone.run(() => this.router.navigate(['/products']));
        })
        // todo: catch error
      )
      .subscribe(); // in real app this would be an http call which doesn't require unsub
  }

  @Action(UserActions.Logout)
  logout(ctx: StateContext<UserStateModel>) {
    ctx.setState((state) => ({
      ...state,
      currentUser: null,
    }));
    this.router.navigate(['/home']);
  }
}
