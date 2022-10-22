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
    this.productService.products = await this.productService.getProducts();
  }

  async productCreated(product: Product) {
    const newProduct = await this.productService.createProduct(product);
    this.productService.products = [
      ...this.productService.products,
      newProduct,
    ];
    this.productService.selectedProduct = newProduct;
    console.log(this.productService.products);
  }

  async productUpdated(product: Product) {
    const updatedProduct = await this.productService.updateProduct(product);
    if (this.productService.products) {
      let idx = this.productService.products.findIndex(
        (p) => p.id === updatedProduct.id
      );
      this.productService.products[idx] = {
        ...this.productService.products[idx],
        ...updatedProduct,
      };
      this.productService.selectedProduct = updatedProduct;
      console.log(this.productService.products);
    }
  }

  async productDeleted(product: Product) {
    if (product.id) {
      await this.productService.deleteProduct(product.id);
      this.productService.products = this.productService.products.filter(
        (p) => p.id !== product.id
      );
    }
  }

  initializeProduct() {
    this.productService.selectedProduct = {
      id: 0,
      productName: 'New Product',
      productCode: 'AAA-123',
      starRating: 3.4,
      description: 'desc',
    } as Product;
  }
}
