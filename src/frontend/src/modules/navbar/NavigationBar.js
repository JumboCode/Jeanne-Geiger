
import React from 'react'
import { ReactComponent as Logo } from './logo.svg'
import { useAuth0 } from '../../react-auth0-spa.js'
import { Link } from 'react-router-dom'
import './NavigationBar.css'

// Redirect to proper landing page depending on user
const logoClick = () => {
  var path = window.location.pathname
  if (path.slice(1, 5) === 'site') {
    window.location.replace('/site')
  } else {
    window.location.replace('/admin')
  }
}

const NavigationBar = () => {
  const { isAuthenticated, logout } = useAuth0()

  return (
    <div className="NavigationBarContainer">
      <Logo class="LogoWrapper" width="17%" onClick={(e) => logoClick(e)}/>
      {isAuthenticated
        ? <button id="logout" onClick={() => {
          logout()

          // Explicitly clear all tokens on logout
          document.cookie = 'token=;path=/admin'
          document.cookie = 'token=;path=/site'
        }}>Log out</button>
        : <Link to='/'><button id="logout">Log in</button></Link>}
    </div>
  )
}

export default NavigationBar
