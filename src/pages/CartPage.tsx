import React, { Component } from 'react';
import { RouteComponentProps } from '@reach/router';
// import { observer } from 'mobx-react-lite';
import '../style/index.scss';
import { CartStore } from '../stores';

class CartPage extends Component<RouteComponentProps> {
  static contextType = CartStore;

  render() {
    const store = this.context;
    return (
      <div className="container">
        <div className="header">
          <h2 className="title">Catalog</h2>
        </div>
        {store.carts.map(cart => {
          return (
            <div key={cart.product.id} className="product">
              <div className="detail">
                <h4>{cart.product.name}</h4>
                <p>
                  {cart.product.price} x {cart.total}
                </p>
              </div>
            </div>
          );
        })}

        <h3>Total: {store.totalPrice}</h3>
      </div>
    );
  }
}

export default CartPage;
