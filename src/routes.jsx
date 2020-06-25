import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Movie from './pages/Movie';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/movie" exact component={Movie} />
    <Route path="/movie/:id" component={Movie} />
  </Switch>
);

export default Routes;
