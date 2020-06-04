import React from 'react'
import './styles.css'
import { ReactComponent as Logo } from './logo.svg'
import { useAuth0 } from '../../react-auth0-spa'

import { DOMAIN_FRONT } from '../../utils/index.js'

const Login = () => {
  const { loginWithRedirect } = useAuth0()

  const redirectUri = DOMAIN_FRONT + 'site/'

  return (
    <div className="login_container">
      <div className="item_container">
        <div className="logo_container">
          <Logo className="logo_style"/>
          <p1 className="dom_text">
                Domestic Violence High-Risk Team Login
          </p1>
          <button className="login_button" onClick={() => loginWithRedirect({ redirect_uri: redirectUri })}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login