import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/Home';
import Admin from './components/Admin';
import Sites from './components/Sites';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

class AppRoutes extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={true} component={SignIn} path="/signin" exact />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;
