import React from 'react';
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';

import adminComOverview from './modules/admin/adminComOverview';
import adminHomepage from './modules/admin/adminHomepage';
import adminViewCaseDetail from './modules/admin/adminViewCaseDetail';
import Login from './modules/logIn';

import addCase from './modules/comManager/addCase';
import comOverview from './modules/comManager/comOverview';
import detailView from './modules/comManager/detailView';
//import editCase from './modules/comManager/editCase';

//import PublicRoute from 'Public';
//import PrivateRoute from 'Private';

	  /*<Route exact path="/site" component = {comOverview} type = "comOverview"/>
	  <Route exact path="/admin/site-view" component = {adminViewCaseDetail} type = "comCaseDetail"/>
	  <Route exact path="/site/add-case" component = {addCase} type = "addCase"/>
	  <Route exact path="/site/case-view" component = {detailView} type = "caseView"/>
*/
export default class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component = {Login} type = "login"/>
          <Route exact path="/admin" component = {adminHomepage} type = "admin"/>
          <Route exact path="/admin/site" component = {adminComOverview} type = "adminoverview"/>
        </Switch>
      </BrowserRouter>
    );
  }
}
