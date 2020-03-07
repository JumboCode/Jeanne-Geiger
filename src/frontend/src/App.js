import React, { Component } from 'react'
import './App.css'
import NavBar from "./modules/logIn/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./modules/logIn/PrivateRoute.js";
import AppRouter from './routes.js'
import Profile from "./modules/logIn/Profile.js"
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";



function App() {
    return (
      <div className="App">
        {/* Don't forget to include the history module */}
        <Router history={history}>
          <header>
            <NavBar />
          </header>
          <Switch>
            <PrivateRoute path="/" exact />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Router>
      </div>
    );
}


export default App;

