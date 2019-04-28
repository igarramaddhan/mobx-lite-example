import { observable, action } from 'mobx';
import uuid from 'uuid/v4';

export class ProductItem {
  id: string = uuid();
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

export default class ProductStoreModel {
  @observable products: Array<ProductItem> = [];

  @action addProduct(product: ProductItem) {
    this.products.push(product);
  }

  @action addProducts(products: Array<ProductItem>) {
    this.products = products;
  }
}
