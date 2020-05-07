// src/modules/auth0button.js
import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import CoordRoute from './CoordRoute.js'
import AdminRoute from './AdminRoute.js'
import adminAddSite from '../admin/adminAddSite'
import adminHomepage from '../admin/adminHomepage'
import adminViewSite from '../admin/adminViewSite'

import siteOverview from '../coords/siteOverview'
import detailView from '../coords/detailView'
import siteAddCase from '../coords/siteAddCase'

import { useAuth0 } from '../../react-auth0-spa.js'

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <div className='auth0button'>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      {isAuthenticated && (
        <span>
          <BrowserRouter>
            <Switch>
              <AdminRoute exact path="/admin" component = {adminHomepage} type = "adminoverview"/>
              <AdminRoute exact path="/admin/add-site" component = {adminAddSite} type = "adminaddsite"/>
              <AdminRoute exact path="/admin/view-site" component = {adminViewSite} type = "adminviewsite"/>
              <CoordRoute exact path="/site" component = {siteOverview} type = "siteView"/>
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
