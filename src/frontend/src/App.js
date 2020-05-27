import React from 'react'
import './App.css'
import Routes from './routes.js'
import { Router } from 'react-router-dom'
import history from './utils/history'
import HttpsRedirect from 'react-https-redirect'

function App () {
  return (
    <HttpsRedirect>
      <div className="App">
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    </HttpsRedirect>
  )
}

export default App
