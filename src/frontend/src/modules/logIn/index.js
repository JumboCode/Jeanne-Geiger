import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import { ReactComponent as Logo } from './logo.svg'
import { useAuth0 } from '../../react-auth0-spa'

class Login extends Component {
  render () {
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
            <a href="/admin"><button className="admin_button" onclick="location.href='/admin'">
                    Admin
            </button></a>
            <a href="/site"><button className="coord_button">
                    Coordinator
            </button></a>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
