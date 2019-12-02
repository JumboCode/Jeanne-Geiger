import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom'

import Login from './modules/logIn'

import adminAddSite from './modules/admin/adminAddSite'
import adminHomepage from './modules/admin/adminHomepage'
import adminViewSite from './modules/admin/adminViewSite'

import siteOverview from './modules/coords/siteOverview'
import detailView from './modules/coords/detailView'

import accRecovery from './modules/accRecovery'

// import PublicRoute from 'Public';
// import PrivateRoute from 'Private';

export default class AppRouter extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component = {Login} type = "login"/>
          <Route exact path="/admin" component = {adminHomepage} type = "adminoverview"/>
          <Route exact path="/admin/add-site" component = {adminAddSite} type = "adminaddsite"/>
          <Route exact path="/admin/view-site" component = {adminViewSite} type = "adminviewsite"/>
          <Route exact path="/site" component = {siteOverview} type = "siteView"/>
          <Route exact path="/site/case-view" component = {detailView} type = "detailView"/>
          <Route exact path="/acc-recovery" component = {accRecovery} type = "accRec"/>
        </Switch>
      </BrowserRouter>
    )
  }
}