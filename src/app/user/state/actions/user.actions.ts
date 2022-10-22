import { createAction, props } from '@ngrx/store';
import { User } from '../../user';

export const login = createAction(
  '[User] Login',
  props<{ userName: string }>()
);
export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ user: User }>()
);
export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);
export const logout = createAction('[User] Logout');
export const logOutSuccess = createAction('[User] Logout Success');
