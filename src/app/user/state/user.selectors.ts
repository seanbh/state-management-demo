import { createSelector } from '@ngrx/store';
import { userFeature } from './user.state';

export const isLoggedIn = createSelector(
  userFeature.selectCurrentUser,
  (currentUser) => !!currentUser
);
