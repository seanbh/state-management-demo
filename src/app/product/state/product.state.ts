import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { catchError, of, tap } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { ProductActions } from './product.actions';

export interface ProductStateModel {
  showProductCode: boolean;
  products: Product[];
  error: string;
  currentProductId: number | null;
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    showProductCode: false,
    products: [],
    error: '',
    currentProductId: null,
  },
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) {}

  @Action(ProductActions.ToggleProductCode)
  toggleProductCode(ctx: StateContext<ProductStateModel>) {
    ctx.setState((state) => ({
      ...state,
      showProductCode: !state.showProductCode,
    }));

    // other ways to set state

    // const state = ctx.getState();
    // ctx.patchState({
    //   showProductCode: !state.showProductCode,
    // });

    // const state = ctx.getState();
    // ctx.setState({
    //   ...state,
    //   showProductCode: !state.showProductCode,
    // });
  }

  @Action(ProductActions.Load)
  loadProducts(ctx: StateContext<ProductStateModel>) {
    return this.productService.getProducts().pipe(
      tap((products) => {
        console.log(products);
        ctx.setState((state) => ({
          ...state,
          error: '',
          products: products,
        }));
      }),
      catchError((error) => {
        ctx.setState((state) => ({
          ...state,
          products: [],
          error: error,
        }));
        return of(error);
      })
    );
  }

  @Action(ProductActions.SetCurrent)
  setCurrentProduct(
    ctx: StateContext<ProductStateModel>,
    action: { currentProductId: number }
  ) {
    ctx.setState((state) => ({
      ...state,
      currentProductId: action.currentProductId,
    }));
  }

  @Action(ProductActions.ClearCurrent)
  clearCurrentProduct(ctx: StateContext<ProductStateModel>) {
    ctx.setState((state) => ({
      ...state,
      currentProductId: null,
    }));
  }

  @Action(ProductActions.InitializeCurrent)
  initializeCurrentProduct(ctx: StateContext<ProductStateModel>) {
    ctx.setState((state) => ({
      ...state,
      currentProductId: 0,
    }));
  }

  @Action(ProductActions.Update)
  updateProduct(
    ctx: StateContext<ProductStateModel>,
    action: { product: Product }
  ) {
    return this.productService.updateProduct(action.product).pipe(
      tap((product) => {
        ctx.setState((state) => ({
          ...state,
          error: '',
          products: state.products.map((p) =>
            p.id !== product.id ? p : product
          ),
        }));
      }),
      catchError((error) => {
        ctx.setState((state) => ({
          ...state,
          error: error,
        }));
        return of(error);
      })
    );
  }

  @Action(ProductActions.Create)
  createProduct(
    ctx: StateContext<ProductStateModel>,
    action: { product: Product }
  ) {
    return this.productService.createProduct(action.product).pipe(
      tap((product) => {
        ctx.setState((state) => ({
          ...state,
          error: '',
          products: [...state.products, product],
        }));
      }),
      catchError((error) => {
        ctx.setState((state) => ({
          ...state,
          error: error,
        }));
        return of(error);
      })
    );
  }

  @Action(ProductActions.Delete)
  deleteProduct(
    ctx: StateContext<ProductStateModel>,
    action: { productId: number }
  ) {
    return this.productService.deleteProduct(action.productId).pipe(
      tap((productId) => {
        ctx.setState((state) => ({
          ...state,
          error: '',
          products: state.products.filter((p) => p.id !== action.productId),
        }));
      }),
      catchError((error) => {
        ctx.setState((state) => ({
          ...state,
          error: error,
        }));
        return of(error);
      })
    );
  }
}
