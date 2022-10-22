import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {
  BehaviorSubject,
  combineLatest,
  firstValueFrom,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _showProductCode = new BehaviorSubject<boolean>(false);
  public readonly showProductCode$ = this._showProductCode.asObservable();

  private _products = new BehaviorSubject<Product[]>([]);
  public readonly products$ = this._products.asObservable();

  private _selectedProductId = new BehaviorSubject<number | null>(null);
  public readonly selectedProductId$ = this._selectedProductId.asObservable();
  public selectedProduct$ = combineLatest([
    this.products$,
    this.selectedProductId$,
  ]).pipe(
    map(([products, selectedProductId]) => {
      if (selectedProductId === 0) {
        return {
          id: 0,
          productName: 'New Product',
          productCode: 'AAA-123',
          starRating: 3.4,
          description: 'desc',
        };
      } else {
        return products.find((p) => p.id === selectedProductId);
      }
    })
  );

  private _errorMessage = new BehaviorSubject<string>('');
  public readonly errorMessage$ = this._errorMessage.asObservable();

  private productsUrl = 'api/products';

  constructor(private http: HttpClient) {}

  toggleDisplayCode() {
    this._showProductCode.next(!this._showProductCode.value);
  }

  loadProducts() {
    this.getProducts()
      .pipe(
        tap((products) => {
          this._errorMessage.next('');
          this._products.next(products);
        }),
        catchError((error) => {
          this._products.next([]);
          this._errorMessage.next(error);
          return of(error);
        })
      )
      .subscribe();
  }

  setSelectedProduct(selectedProduct: Product) {
    this._selectedProductId.next(selectedProduct?.id);
  }

  initializeNewProduct() {
    this._selectedProductId.next(0);
  }

  clearCurrent() {
    this._selectedProductId.next(null);
  }

  private getProducts(): Observable<Product[]> {
    // return throwError(() => new Error('Could not load products'));

    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createProduct(product: Product): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Product Id must be null for the Web API to assign an Id
    const newProduct = { ...product, id: null };
    this.http
      .post<Product>(this.productsUrl, product, { headers })
      .pipe(
        tap((newProduct) => {
          this._products.next([...this._products.value, newProduct]);
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  deleteProduct(id: number): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;

    this.http
      .delete<Product>(url, { headers })
      .pipe(
        tap(() =>
          this._products.next(this._products.value.filter((p) => p.id !== id))
        ),
        catchError(this.handleError)
      )
      .subscribe();
  }

  updateProduct(product: Product): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    console.log(product);
    this.http
      .put<Product>(url, product, { headers })
      .pipe(
        tap(() => {
          this._products.next(
            this._products.value.map((p) => (p.id === product.id ? product : p))
          );
        }),
        catchError(this.handleError)
      )
      .subscribe();
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body?.error}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }
}
