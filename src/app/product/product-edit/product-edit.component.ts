import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements OnInit, OnChanges {
  pageTitle = 'Product Edit';
  @Input() errorMessage?: string;
  @Input() selectedProduct?: Product | null;
  @Output() create = new EventEmitter<Product>();
  @Output() update = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() clearCurrent = new EventEmitter<void>();

  productForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Define the form group
    this.productForm = this.fb.group({
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      productCode: ['', Validators.required],
      starRating: [''],
      description: '',
    });

    this.displayProduct(this.selectedProduct);
  }

  ngOnChanges(changes: any): void {
    // ngOnChanges doesn't fire when we ref productService.selectedProduct in the template instead of the @Input selectedProduct
    // patch form with value from the store
    if (changes.selectedProduct) {
      const product = changes.selectedProduct.currentValue as Product;
      this.displayProduct(product);
    }
    console.log('ngOnChanges');
  }

  displayProduct(product: Product | null | undefined): void {
    if (product && this.productForm) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${product.productName}`;
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: product.productName,
        productCode: product.productCode,
        starRating: product.starRating,
        description: product.description,
      });
    }
  }

  cancelEdit(): void {
    this.clearCurrent.emit();
  }

  deleteProduct(): void {
    if (this.selectedProduct && this.selectedProduct.id) {
      if (
        confirm(
          `Really delete the product: ${this.selectedProduct.productName}?`
        )
      ) {
        this.delete.emit(this.selectedProduct);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      // Copy over all of the original product properties
      // Then copy over the values from the form
      // This ensures values not on the form, such as the Id, are retained
      const product = {
        ...this.selectedProduct,
        ...this.productForm.value,
      };

      if (product.id === 0) {
        this.create.emit(product);
      } else {
        this.update.emit(product);
      }
    }
  }
}
