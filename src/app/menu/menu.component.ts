import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { productFeature, State } from '../product/state/product.reducer';
import { UserActions } from '../user/state/actions';
import { isLoggedIn } from '../user/state/user.selectors';
import { userFeature } from '../user/state/user.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  pageTitle = 'Acme Product Management';

  products$ = this.store.select(productFeature.selectProducts);

  isLoggedIn$ = this.store.select(isLoggedIn);

  userName$ = this.store
    .select(userFeature.selectCurrentUser)
    .pipe(map((currentUser) => currentUser?.userName ?? ''));

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  logOut(): void {
    this.store.dispatch(UserActions.logout());
  }
}
