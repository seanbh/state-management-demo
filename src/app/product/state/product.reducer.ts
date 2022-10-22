import * as AppState from '../../state/app.state';
import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductApiActions, ProductPageActions } from './actions';
import { Product } from '../product';
// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  product: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  products: Product[];
  error: string;
  currentProductId: number | null;
}

const initialState: ProductState = {
  showProductCode: false,
  products: [],
  error: '',
  currentProductId: null,
};

export const productFeature = createFeature({
  name: 'product',
  reducer: createReducer(
    initialState,
    on(ProductPageActions.toggleProductCode, (state) => ({
      ...state,
      showProductCode: !state.showProductCode,
    }))
  ),
});
