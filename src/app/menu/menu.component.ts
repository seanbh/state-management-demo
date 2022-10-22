import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from '../product/product';
import { ProductSelectors } from '../product/state/product.selectors';
import { AuthService } from '../user/auth.service';
import { UserActions } from '../user/state/user.actions';
import { UserSelectors } from '../user/state/user.selectors';
import { UserStateModel } from '../user/state/user.state';
import { User } from '../user/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  pageTitle = 'Acme Product Management';

  @Select(ProductSelectors.products)
  products$!: Observable<Product[]>;

  @Select(UserSelectors.isLoggedIn)
  isLoggedIn$!: Observable<boolean>;

  @Select(
    (state: { user: UserStateModel }) => state.user.currentUser?.userName || ''
  )
  userName$!: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {}

  logOut(): void {
    this.store.dispatch(new UserActions.Logout());
  }
}
