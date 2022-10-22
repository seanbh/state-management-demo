import { Product } from '../product';

export namespace ProductActions {
  export class ToggleProductCode {
    static readonly type = '[Product] - Toggle Product Code';
  }

  export class Load {
    static readonly type = '[Product] - Load Products';
  }

  export class SetCurrent {
    static readonly type = '[Product] - Set Current Product';
    constructor(public currentProductId: number) {}
  }

  export class ClearCurrent {
    static readonly type = '[Product] - Clear Current Product';
  }

  export class InitializeCurrent {
    static readonly type = '[Product] - Initialize Current Product';
  }

  export class Update {
    static readonly type = '[Product] - Update Product';
    constructor(public product: Product) {}
  }

  export class Create {
    static readonly type = '[Product] - Create Product';
    constructor(public product: Product) {}
  }

  export class Delete {
    static readonly type = '[Product] - Delete Product';
    constructor(public productId: number) {}
  }
}
