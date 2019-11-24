import React, { Component } from 'react'
import './App.css'

/*import { adminComOverview } from './modules/admin/adminComOverview'
import { adminHomepage } from './modules/admin/adminHomepage'
import { adminViewCaseDetail } from './modules/admin/adminViewCaseDetail'
import Login from './modules/logIn'

import { addCase } from './modules/comManager/addCase'
import { comOverview } from './modules/comManager/comOverview'
import { detailView } from './modules/comManager/detailView'
import { editCase } from './modules/comManager/editCase'*/
import AppRouter from './routes.js'

/*
function App () {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <AppRouter />
    </div>
  )
}
return <AppRouter />;
*/

class App extends Component {
  render () {
    return (
      <AppRouter />
    )
  }
}

export default App
