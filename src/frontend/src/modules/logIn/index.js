import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import { ReactComponent as Logo } from './logo.svg'
import { useAuth0 } from '../../react-auth0-spa'

import { Redirect } from 'react-router-dom'
import { DOMAIN_FRONT } from '../../utils/index.js'

const Login = () => {
  const { roles, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const adminRedirect = DOMAIN_FRONT + 'site/'
  const coordRedirect = DOMAIN_FRONT + 'admin/'

  return (
    <div className="login_container">
      <div className="item_container">
        <div className="logo_container">
          <Logo className="logo_style"/>
          <p1 className="dom_text">
                    Domestic Violence High-Risk Team Login
          </p1>
        </div>
      </div>
      <div class="vl"></div>
      <div className="item_container">
        <div className="text_container">
          <form>
            <input type="email" className="email_form" placeholder="  Email"/>
            <input type="password" className="password_form" placeholder="  Password"/>
          </form>
          <p1 className="forgot_text">
                    Forgot your username or password?
          </p1>
        </div>
        <div className="button_container">
          <button className="coord_button" onClick={() => loginWithRedirect({ redirect_uri: coordRedirect })}>Coordinator</button>
          <button className="admin_button" onClick={() => loginWithRedirect({ redirect_uri: adminRedirect })}>Admin</button>
        </div>
      </div>
    </div>
  )
}

export default Login
