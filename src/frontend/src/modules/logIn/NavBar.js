// src/modules/auth0button.js
import React from 'react'
import { Route, BrowserRouter, Switch, Link } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute.js";
import Login from '../admin/adminAddSite';

import adminAddSite from '../admin/adminAddSite'
import adminHomepage from '../admin/adminHomepage'
import adminViewSite from '../admin/adminViewSite'

import siteOverview from '../coords/siteOverview'
import detailView from '../coords/detailView'
import siteAddCase from '../coords/siteAddCase'

import accRecovery from '../accRecovery'
//            <Route exact path="/" component = {Login} type = "login"/>


//import { AuthContext } from '../'
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
            <PrivateRoute exact path="/admin" component = {adminHomepage} type = "adminoverview"/>
            <PrivateRoute exact path="/admin/add-site" component = {adminAddSite} type = "adminaddsite"/>
            <PrivateRoute exact path="/admin/view-site" component = {adminViewSite} type = "adminviewsite"/>
            <PrivateRoute exact path="/site" component = {siteOverview} type = "siteView"/>
            <PrivateRoute exact path="/site/case-view" component = {detailView} type = "detailView"/>
            <PrivateRoute exact path="/site/add-case" component = {siteAddCase} type = "siteAddCase"/>
            <PrivateRoute exact path="/acc-recovery" component = {accRecovery} type = "accRec"/>
          </Switch>
        </BrowserRouter>
      </span>
    )}
    </div>
  );
};

export default NavBar;
