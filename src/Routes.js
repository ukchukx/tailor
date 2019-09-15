import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Clients from './Clients';
import Client from './Client';

export default () => (
  <Switch>
    <Route exact path="/">
      <Redirect to="/clients" />
    </Route>
    <Route path="/clients" exact component={Clients} />
    <Route path="/clients/:id" exact component={Client} />
  </Switch>
);
