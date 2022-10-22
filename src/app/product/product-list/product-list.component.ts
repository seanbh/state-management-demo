import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() errorMessage?: string;
  @Input() selectedProduct?: Product;
  @Output() displayCodeChanged = new EventEmitter<void>();
  @Output() initializeNewProduct = new EventEmitter<void>();
  @Output() productWasSelected = new EventEmitter<Product>();

  constructor(public productService: ProductService) {}

  checkChanged(): void {
    //this.displayCodeChanged.emit();
    this.productService.displayCode = !this.productService.displayCode;
  }

  newProduct(): void {
    this.initializeNewProduct.emit();
  }

  productSelected(product: Product): void {
    this.productService.selectedProduct = product;
    //this.productWasSelected.emit(product);
  }
}
