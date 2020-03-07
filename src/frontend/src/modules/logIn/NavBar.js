// src/modules/auth0button.js
import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';

//import Login from '../admin/adminAddSite';

import adminAddSite from '../admin/adminAddSite'
import adminHomepage from '../admin/adminHomepage'
import adminViewSite from '../admin/adminViewSite'

import siteOverview from '../coords/siteOverview'
import detailView from '../coords/detailView'
import siteAddCase from '..p/coords/siteAddCase'

import accRecovery from '../accRecovery'

import { AuthContext } from '../'
import { useAuth0 } from "../../react-auth0-spa.js";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
            <Route exact path="/" component = {Login} type = "login"/>
            <Route exact path="/admin" component = {adminHomepage} type = "adminoverview"/>
            <Route exact path="/admin/add-site" component = {adminAddSite} type = "adminaddsite"/>
            <Route exact path="/admin/view-site" component = {adminViewSite} type = "adminviewsite"/>
            <Route exact path="/site" component = {siteOverview} type = "siteView"/>
            <Route exact path="/site/case-view" component = {detailView} type = "detailView"/>
            <Route exact path="/site/add-case" component = {siteAddCase} type = "siteAddCase"/>
            <Route exact path="/acc-recovery" component = {accRecovery} type = "accRec"/>
          </Switch>
        </BrowserRouter>
      </span>
    )}
    </div>
  );
};

export default NavBar;
