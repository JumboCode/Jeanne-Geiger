// src/modules/auth0button.js
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CoordRoute from './CoordRoute.js'
import AdminRoute from './AdminRoute.js'
import adminAddSite from '../admin/adminAddSite'
import adminHomepage from '../admin/adminHomepage'
import adminViewSite from '../admin/adminViewSite'

import siteOverview from '../coords/siteOverview'
import detailView from '../coords/detailView'
import siteAddCase from '../coords/siteAddCase'

import { useAuth0 } from '../../react-auth0-spa.js'
import Test from './../../test.js'
import Login from './index.js'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <div className='auth0button'>
      {/* {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({redirect_uri: 'http://localhost:3000/site'})}>Log in NavBar</button>
      )} */}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      {(
        <span>
          <BrowserRouter>
            <Switch>
              <Route exact path="/test" component = {Test} type = "test"/>
              <Route exact path="/" component = {Login} type = "login"/>
              <AdminRoute exact path="/admin" component = {adminHomepage} type = "adminoverview"/>
              <AdminRoute exact path="/admin/add-site" component = {adminAddSite} type = "adminaddsite"/>
              <AdminRoute exact path="/admin/view-site" component = {adminViewSite} type = "adminviewsite"/>
              <CoordRoute exact path="/site" component = {siteOverview} type = "siteView"/>
              <CoordRoute exact path="/site/edit-case" component = {siteAddCase} type = "siteAddCase"/>
              <CoordRoute exact path="/site/site-summary" component = {adminViewSite} type = "adminviewsite"/>
              <CoordRoute exact path="/site/case-view" component = {detailView} type = "detailView"/>
              <CoordRoute exact path="/site/add-case" component = {siteAddCase} type = "siteAddCase"/>
            </Switch>
          </BrowserRouter>
        </span>
      )}
    </div>
  )
}

export default NavBar
