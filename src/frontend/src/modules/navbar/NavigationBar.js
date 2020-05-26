
import React, { Component } from 'react'
import { ReactComponent as Logo } from './logo.svg'
import { ReactComponent as Settings } from './SettingsIcon.svg'
import { useAuth0 } from '../../react-auth0-spa.js'
import { Link } from 'react-router-dom'
import './NavigationBar.css'

const logoClick = () => {
  var path = window.location.pathname
  var host = window.location.hostname
  if (path.slice(1, 5) === 'site') {
    window.location.replace('/site')
  } else {
    window.location.replace('/admin')
  }
}

const NavigationBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <div className="NavigationBarContainer">
      <Logo class="LogoWrapper" width="17%" onClick={(e) => logoClick(e)}/>
      {!isAuthenticated && <Link to='/'><button id="logout">Log in</button></Link>}
      {isAuthenticated && <button id="logout" onClick={() => logout()}>Log out</button>}
    </div>
  )
}

export default NavigationBar
