import { Selector } from '@ngxs/store';
import { ProductState, ProductStateModel } from './product.state';

export class ProductSelectors {
  @Selector([ProductState])
  static showProductCode(state: ProductStateModel) {
    return state.showProductCode;
  }

  @Selector([ProductState])
  static products(state: ProductStateModel) {
    return state?.products;
  }

  @Selector([ProductState])
  static error(state: ProductStateModel) {
    return state.error;
  }

  @Selector([ProductState])
  static currentProduct(state: ProductStateModel) {
    if (state.currentProductId === 0) {
      return {
        id: 0,
        productName: 'New Product',
        productCode: 'AAA-123',
        starRating: 3.4,
        description: 'desc',
      };
    } else {
      return state.currentProductId && state.products.length
        ? state.products.find((p) => p.id === state.currentProductId)
        : null;
    }
  }
}
