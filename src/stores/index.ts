import { createContext } from 'react';
import CartStoreModel from './CartStore';
import ProductStoreModel, { ProductItem } from './ProductStore';

const productStore = new ProductStoreModel();
const cartStore = new CartStoreModel(productStore);

productStore.addProducts([
  new ProductItem('Jagung', 2000),
  new ProductItem('Cabai', 3000),
  new ProductItem('Jeruk', 4000),
  new ProductItem('Mangga', 3500),
]);

export const ProductStore = createContext(productStore);
export const CartStore = createContext(cartStore);
