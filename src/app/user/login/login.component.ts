import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserActions } from '../state/actions';

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
      this.store.dispatch(
        UserActions.login({ userName: loginForm.form.value.userName })
      );
    }
  }
}
