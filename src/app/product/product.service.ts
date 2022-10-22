import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products: Product[] = [];
  public selectedProduct: Product | null = null;
  public displayCode = false;

  private productsUrl = 'api/products';

  constructor(private http: HttpClient) {}

  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.productsUrl).pipe(
  //     tap((data) => console.log(JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  async getProducts(): Promise<Product[]> {
    const products = await firstValueFrom(
      this.http.get<Product[]>(this.productsUrl).pipe(
        tap((data) => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      )
    );
    return products;
  }

  // createProduct(product: Product): Observable<Product> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   // Product Id must be null for the Web API to assign an Id
  //   const newProduct = { ...product, id: null };
  //   return this.http
  //     .post<Product>(this.productsUrl, newProduct, { headers })
  //     .pipe(
  //       tap((data) => console.log('createProduct: ' + JSON.stringify(data))),
  //       catchError(this.handleError)
  //     );
  // }

  async createProduct(product: Product): Promise<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Product Id must be null for the Web API to assign an Id
    const newProduct = { ...product, id: null };
    const savedProduct = await firstValueFrom(
      this.http.post<Product>(this.productsUrl, newProduct, { headers }).pipe(
        tap((data) => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      )
    );

    return savedProduct;
  }

  // deleteProduct(id: number): Observable<{}> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const url = `${this.productsUrl}/${id}`;
  //   return this.http.delete<Product>(url, { headers }).pipe(
  //     tap((data) => console.log('deleteProduct: ' + id)),
  //     catchError(this.handleError)
  //   );
  // }

  deleteProduct(id: number): Promise<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return firstValueFrom(
      this.http.delete<Product>(url, { headers }).pipe(
        tap((data) => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      )
    );
  }

  // updateProduct(product: Product): Observable<Product> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const url = `${this.productsUrl}/${product.id}`;
  //   return this.http.put<Product>(url, product, { headers }).pipe(
  //     tap(() => console.log('updateProduct: ' + product.id)),
  //     // Return the product on an update
  //     map(() => product),
  //     catchError(this.handleError)
  //   );
  // }

  updateProduct(product: Product): Promise<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    const updatedProduct = firstValueFrom(
      this.http.put<Product>(url, product, { headers }).pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      )
    );

    return updatedProduct;
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
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }
}
