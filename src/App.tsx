import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router } from '@reach/router';

// import pages here
import Index from './pages/index';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router id="root">
      <Index path="/" />
      <CartPage path="cart" />
    </Router>
  );
}

export default hot(App);
