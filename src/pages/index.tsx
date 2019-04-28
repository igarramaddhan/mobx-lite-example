import React, { FunctionComponent, useContext } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import { observer } from 'mobx-react-lite';
import '../style/index.scss';
import { ProductStore, CartStore } from '../stores';

const Index: FunctionComponent<RouteComponentProps> = () => {
  const productStore = useContext(ProductStore);
  const cartStore = useContext(CartStore);

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Catalog</h2>
        <span onClick={() => navigate('cart')}>{cartStore.carts.length}</span>
      </div>
      {productStore.products.map(product => {
        return (
          <div key={product.id} className="product">
            <div className="detail">
              <h4>{product.name}</h4>
              <p>{product.price}</p>
            </div>
            <button
              className="btn"
              onClick={() => cartStore.addToCart(product, 1)}
            >
              ADD
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default observer(Index);
