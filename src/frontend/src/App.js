import React, { Component } from 'react'
import './App.css'
import NavBar from './modules/logIn/NavBar'
import Routes from './routes.js'
import { Router, Route, Switch } from 'react-router-dom'
import history from './utils/history'
import HttpsRedirect from 'react-https-redirect'

function App () {
  return (
    <HttpsRedirect>
      <div className="App">
        {/* Don't forget to include the history module */}
        <Router history={history}>
          <NavBar />
        </Router>
      </div>
    </HttpsRedirect>
  )
}

export default App
