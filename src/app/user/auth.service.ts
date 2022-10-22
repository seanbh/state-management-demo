import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  redirectUrl!: string;

  constructor() {}

  login(userName: string) {
    // Code here would log into a back end service
    // and return user information
    // This is just hard-coded here.
    var currentUser = {
      id: 2,
      userName,
      isAdmin: false,
    };
    return of(currentUser);
  }
}
