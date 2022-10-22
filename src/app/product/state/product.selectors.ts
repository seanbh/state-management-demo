import { createSelector } from '@ngrx/store';
import { productFeature } from './product.reducer';

export const getCurrentProduct = createSelector(
  productFeature.selectCurrentProductId,
  productFeature.selectProducts,
  (currentProductId, products) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: 'New Product',
        productCode: 'AAA-123',
        starRating: 3.4,
        description: 'desc',
      };
    } else {
      return currentProductId
        ? products.find((p) => p.id === currentProductId)
        : null;
    }
  }
);
