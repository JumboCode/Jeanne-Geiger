import React from 'react'
import { Route, BrowserRouter, Switch, Link} from 'react-router-dom'
import PrivateRoute from './Authenticate.js'

import App from './App.js'

import adminAddSite from './modules/admin/adminAddSite'
import adminHomepage from './modules/admin/adminHomepage'
import adminViewSite from './modules/admin/adminViewSite'

import siteOverview from './modules/coords/siteOverview'
import detailView from './modules/coords/detailView'

import accRecovery from './modules/accRecovery'
import Authenticate from './Authenticate.js'
// import PublicRoute from 'Public';
// import PrivateRoute from 'Private';

export default class AppRouter extends React.Component {
  render () {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component = {App} type = "login"/>
          <Route exact path="/login" component = {App} type = "login"/>
          <PrivateRoute exact path="/admin" component = {adminHomepage} type = "adminoverview"/>
          <PrivateRoute exact path="/admin/add-site" component = {adminAddSite} type = "adminaddsite"/>
          <PrivateRoute exact path="/admin/view-site" component = {adminViewSite} type = "adminviewsite"/>
          <PrivateRoute exact path="/site" component = {siteOverview} type = "siteView"/>
          <PrivateRoute exact path="/site/case-view" component = {detailView} type = "detailView"/>
          <Route exact path="/acc-recovery" component = {accRecovery} type = "accRec"/>
        </Switch>
      </BrowserRouter>
    )
  }
}
