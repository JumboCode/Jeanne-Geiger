import React from 'react'
import './App.css'
import NavBar from './modules/logIn/NavBar'
import { Router } from 'react-router-dom'
import history from './utils/history'
import HttpsRedirect from 'react-https-redirect'

function App () {
  return (
    <HttpsRedirect>
      <div className="App">
        <Router history={history}>
          <NavBar />
        </Router>
      </div>
    </HttpsRedirect>
  )
}

export default App
