import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Store } from '@ngxs/store';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductActions } from '../state/product.actions';
import { ProductSelectors } from '../state/product.selectors';
@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.scss'],
})
export class ProductShellComponent implements OnInit {
  @Select(ProductSelectors.showProductCode)
  showProductCode$!: Observable<boolean | null>;

  // Reads the name of the state from the state class (returns ProductState)
  // @Select(ProductState)
  // productState$!: Observable<ProductStateModel>;
  // in template: ((productState$ | async) ?? {}).products

  // Uses the memoized selector to only return products
  @Select(ProductSelectors.products)
  products$!: Observable<Product[]>;

  // Function (returns entire state object, so must drill down to ProductState)
  // @Select((state: { product: ProductStateModel }) => state.product.products)
  // products$!: Observable<Product[]>;

  // Reads the name of the state from the parameter (must be named  product$, matches name=product); (returns ProductState)
  //@Select() productState$!: Observable<ProductStateModel>;
  // in template: ((productState$ | async) ?? {}).products

  @Select(ProductSelectors.error)
  errorMessage$!: Observable<string>;

  @Select(ProductSelectors.currentProduct)
  selectedProduct$!: Observable<Product | null>;

  constructor(private store: Store) {}

  async ngOnInit() {
    this.store.dispatch(new ProductActions.Load());
  }

  onProductSelected(selectedProduct: Product) {
    this.store.dispatch(new ProductActions.SetCurrent(selectedProduct.id));
  }

  clearCurrent() {
    this.store.dispatch(new ProductActions.ClearCurrent());
  }

  onDisplayCodeChanged() {
    this.store.dispatch(new ProductActions.ToggleProductCode());
  }

  productCreated(product: Product) {
    this.store.dispatch(new ProductActions.Create(product));
  }

  productUpdated(product: Product) {
    this.store.dispatch(new ProductActions.Update(product));
  }

  productDeleted(product: Product) {
    this.store.dispatch(new ProductActions.Delete(product.id));
  }

  initializeProduct() {
    this.store.dispatch(new ProductActions.InitializeCurrent());
  }
}
