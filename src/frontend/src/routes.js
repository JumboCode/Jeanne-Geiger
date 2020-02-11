import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom'

import Login from './modules/logIn'

import adminAddSite from './modules/admin/adminAddSite'
import adminHomepage from './modules/admin/adminHomepage'
import adminViewSite from './modules/admin/adminViewSite'

import siteOverview from './modules/coords/siteOverview'
import detailView from './modules/coords/detailView'
import siteAddCase from './modules/coords/siteAddCase'

import accRecovery from './modules/accRecovery'

import { AuthContext } from './contexts/auth'

// import PublicRoute from 'Public';
import PrivateRoute from './Private'

export default class AppRouter extends React.Component {
  render () {
    return (
      <AuthContext.Provider value={false}>
      	<BrowserRouter>
       	 <Switch>
       	   <Route exact path="/" component = {Login} type = "login"/>
       	   <Route exact path="/admin" component = {adminHomepage} type = "adminoverview"/>
       	   <PrivateRoute exact path="/admin/add-site" component = {adminAddSite} type = "adminaddsite"/>
           <Route exact path="/admin/view-site" component = {adminViewSite} type = "adminviewsite"/>
           <Route exact path="/site" component = {siteOverview} type = "siteView"/>
           <Route exact path="/site/case-view" component = {detailView} type = "detailView"/>
           <Route exact path="/site/add-case" component = {siteAddCase} type = "siteAddCase"/>
           <Route exact path="/acc-recovery" component = {accRecovery} type = "accRec"/>
         </Switch>
       </BrowserRouter>
      </AuthContext.Provider>
    )
  }
}
