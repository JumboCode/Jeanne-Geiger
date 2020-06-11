import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import CoordRoute from './modules/logIn/CoordRoute.js'
import AdminRoute from './modules/logIn/AdminRoute.js'
import notFound from './modules/logIn/NotFound.js'
import Login from './modules/logIn/index.js'

import adminAddSite from './modules/admin/adminAddSite'
import adminHomepage from './modules/admin/adminHomepage'
import adminViewSite from './modules/admin/adminViewSite'
import adminManageSite from './modules/admin/adminManageSite'

import siteOverview from './modules/coords/siteOverview'
import detailView from './modules/coords/detailView'
import siteAddCase from './modules/coords/siteAddCase'

// Routing table
// AdminRoute protects routes which are accessible only by users with admin-level permissions
// CoordRoute protects routes which are accessible only by users with coordinator-level permissions
const Routes = () => {
  return (
    <div className="auth0button">
      {(
        <span>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component = {Login} type = "login"/>
              <AdminRoute exact path="/admin" component = {adminHomepage} type = "adminoverview"/>
              <AdminRoute exact path="/admin/add-site" component = {adminAddSite} type = "adminaddsite"/>
              <AdminRoute exact path="/admin/view-site" component = {adminViewSite} type = "adminviewsite"/>
              <AdminRoute exact path="/admin/manage-site" component = {adminManageSite} type = "adminmanagesite"/>
              <CoordRoute exact path="/site" component = {siteOverview} type = "siteView"/>
              <CoordRoute exact path="/site/edit-case" component = {siteAddCase} type = "siteAddCase"/>
              <CoordRoute exact path="/site/site-summary" component = {adminViewSite} type = "adminviewsite"/>
              <CoordRoute exact path="/site/case-view" component = {detailView} type = "detailView"/>
              <CoordRoute exact path="/site/add-case" component = {siteAddCase} type = "siteAddCase"/>
              <Route path="*" component = {notFound} type = "404" />
            </Switch>
          </BrowserRouter>
        </span>
      )}
    </div>
  )
}

export default Routes
