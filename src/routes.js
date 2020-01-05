import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Cart from './pages/Cart';
import Product from './pages/Product';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/cart" component={Cart} />
      <Route path="/product/:id" component={Product} />
    </Switch>
  );
}
