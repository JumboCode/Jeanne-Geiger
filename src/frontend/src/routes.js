import React from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';

import adminComOverview from './modules/admin/adminComOverview';
import adminHomepage from './modules/admin/adminHomepage';
import adminViewCaseDetail from './modules/admin/adminViewCaseDetail';
import Login from './modules/logIn';

import addCase from './modules/comManager/addCase';
import comOverview from './modules/comManager/comOverview';
import detailView from './modules/comManager/detailView';
import editCase from './modules/comManager/editCase';

//import PublicRoute from 'Public';
//import PrivateRoute from 'Private';

export default class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
	    <Route path="/" component = {Login} />
	    <Route path="/admin" component = {adminHomepage} />
	    <Route path="/site" component = {comOverview} />
        </Switch>
      </BrowserRouter>
    );
  }
}
