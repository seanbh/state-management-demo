import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../user';
import { UserActions } from './actions';

// State for this feature (User)
export interface UserState {
  currentUser: User | null;
}

const initialState: UserState = {
  currentUser: null,
};

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(UserActions.loginSuccess, (state, action) => ({
      ...state,
      currentUser: action.user,
    })),
    on(UserActions.loginFailure, (state, action) => ({
      ...state,
      currentUser: null,
    })),
    on(UserActions.logOutSuccess, (state, action) => ({
      ...state,
      currentUser: null,
    }))
  ),
});
