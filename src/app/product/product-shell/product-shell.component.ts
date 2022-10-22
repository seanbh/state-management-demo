import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { State, productFeature } from '../state/product.reducer';

import { Store } from '@ngrx/store';
import { startWith, tap } from 'rxjs';
import { ProductPageActions } from '../state/actions';
import { getCurrentProduct } from '../state/product.selectors';

@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.scss'],
})
export class ProductShellComponent implements OnInit {
  showProductCode$ = this.store.select(productFeature.selectShowProductCode);
  products$ = this.store.select(productFeature.selectProducts);
  errorMessage$ = this.store.select(productFeature.selectError);
  selectedProduct$ = this.store.select(getCurrentProduct);

  constructor(
    public productService: ProductService,
    private store: Store<State>
  ) {}

  async ngOnInit() {
    this.store.dispatch(ProductPageActions.loadProducts());
  }

  onProductSelected(selectedProduct: Product) {
    this.store.dispatch(
      ProductPageActions.setCurrentProduct({
        currentProductId: selectedProduct.id,
      })
    );
  }

  clearCurrent() {
    this.store.dispatch(ProductPageActions.clearCurrentProduct());
  }

  onDisplayCodeChanged() {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  async productCreated(product: Product) {
    this.store.dispatch(ProductPageActions.createProduct({ product }));
  }

  async productUpdated(product: Product) {
    this.store.dispatch(ProductPageActions.updateProduct({ product }));
  }

  async productDeleted(product: Product) {
    if (product.id) {
      this.store.dispatch(
        ProductPageActions.deleteProduct({ productId: product.id })
      );
    }
  }

  initializeProduct() {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }
}
