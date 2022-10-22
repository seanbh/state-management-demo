import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-shell',
  templateUrl: './product-shell.component.html',
  styleUrls: ['./product-shell.component.scss'],
})
export class ProductShellComponent implements OnInit {
  constructor(public productService: ProductService) {}

  async ngOnInit() {
    this.productService.loadProducts();
  }

  onDisplayCodeChanged() {
    this.productService.toggleDisplayCode();
  }

  onProductSelected(selectedProduct: Product) {
    this.productService.setSelectedProduct(selectedProduct);
  }

  clearCurrent() {
    this.productService.clearCurrent();
  }

  productCreated(product: Product) {
    this.productService.createProduct(product);
  }

  async productUpdated(product: Product) {
    this.productService.updateProduct(product);
  }

  async productDeleted(product: Product) {
    if (product?.id) {
      this.productService.deleteProduct(product.id);
    }
  }

  initializeProduct() {
    this.productService.initializeNewProduct();
  }
}
