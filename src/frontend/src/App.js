import React, { Component } from 'react'
import './App.css'
import NavBar from './modules/logIn/NavBar'
import Routes from './routes.js'
import { Router, Route, Switch } from 'react-router-dom'
import history from './utils/history'

function App () {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Route exact path="/" component={Routes}/>
      </Router>
    </div>
  )
}

export default App
