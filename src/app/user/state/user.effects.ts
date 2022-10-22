import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserActions } from './actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap((action) =>
        this.authService.login(action.userName).pipe(
          map((user) => UserActions.loginSuccess({ user })),
          tap(() => {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
              this.router.navigate(['/products']);
            }
          }),
          catchError((error) => of(UserActions.loginFailure({ error })))
        )
      )
    );
  });

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.logout),
      mergeMap((action) => {
        this.router.navigate(['/home']);
        return of(UserActions.logOutSuccess());
      })
    );
  });
}
