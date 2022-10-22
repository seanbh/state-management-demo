import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from '../auth.service';
import { UserActions } from '../state/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userName = 'Sean';

  constructor(private store: Store) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    if (loginForm?.valid) {
      this.store.dispatch(new UserActions.Login(loginForm.form.value.userName));
    }
  }
}
