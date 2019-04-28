import { observable, computed, action } from 'mobx';
import ProductStoreModel, { ProductItem } from './ProductStore';

export class CartItem {
  product: ProductItem;
  @observable total: number;

  constructor(product: ProductItem, total: number) {
    this.product = product;
    this.total = total;
  }
}

export default class CartStoreModel {
  productStore: ProductStoreModel;
  @observable carts: Array<CartItem> = [];

  constructor(productStore: ProductStoreModel) {
    this.productStore = productStore;
  }

  @computed get totalPrice(): number {
    return this.carts.reduce(
      (prev, current) => prev + current.total * current.product.price,
      0
    );
  }

  @action addToCart(product: ProductItem, total: number) {
    const current = this.carts.find(item => item.product.id == product.id);
    if (current) {
      current.total += total;
      return;
    }

    this.carts.push(new CartItem(product, total));
  }
}
