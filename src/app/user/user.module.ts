import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './state/user.state';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';

const routes = [{ path: 'login', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([UserEffects]),
  ],
})
export class UserModule {}
