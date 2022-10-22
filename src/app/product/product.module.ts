import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { RouterModule } from '@angular/router';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { productFeature } from './state/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './state/product.effects';

const routes = [{ path: '', component: ProductShellComponent }];
@NgModule({
  declarations: [
    ProductShellComponent,
    ProductEditComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(productFeature),
    EffectsModule.forFeature([ProductEffects]),
  ],
})
export class ProductModule {}
