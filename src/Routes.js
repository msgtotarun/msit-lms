import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import test from './Pages/t'

const Routes = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={Home}></Route>
      <Route exact path='/test' component={test}></Route>
    </Switch>
  );
}

export default Routes;