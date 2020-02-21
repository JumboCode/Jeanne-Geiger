import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import { ReactComponent as Logo } from './logo.svg';

/*
class SignIn extends React.Component {
    constructor(prop) {
        super(props)
        this.state = {
            email: '',
            password: ''
        };
        this.props = {
            title: 'Sign In Page'
        };
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.sendSubmit = this.sendSubmit.bind(this);
    }

    setEmail(event) {
        this.setState({ email: event.target.value });
    }

    setPassword(event) {
        this.setState({ password: event.target.value });
    }

    validate(email, password) {
        const emailRegex = RegExp(/.+\@.+\..+/);
    }

    sendSubmit() {
        console.log(`email: ${this.state.email}`);
    }
}

render()
{
    const invalidInputClass = 'error'; // class name assigned to input elements with invalid values
    const errors = this.validate(this.state.email, this.state.password);

    return (
        <div className="back">
            <div className="form">
                <h1>Jeanne Geiger</h1>

                <label htmlFor="form-email-input">
                    {' '}
                    Email Address <br />{' '}
                </label>
                <input
                    id="form-email-input"
                    className={errors.email ? invalidInputClass : ''}
                    type="text"
                    value={this.state.email}
                    placeholder="Enter email here"
                    onChange={this.setEmail}
                    style={{ width: 400 }}
                />
                <br />
                <label htmlFor="form-pass-input">
                    {' '}
                    Password <br />{' '}
                </label>
                <input
                    id="form-pass-input"
                    className={errors.password ? invalidInputClass : ''}
                    type="password"
                    value={this.state.password}
                    placeholder="Enter password here"
                    onChange={this.setPassword}
                    style={{ width: 400 }}
                />
                <br />
                <br />
                <div className="linking">
                    <button onClick={this.sendSubmit} className="button">
                        Log In
              </button>
                    <br />
                    <p>Forgot Your Password?</p>
                    <a href="/tournaments">Click here</a>
                </div>
            </div>
        </div>
    );
}
*/

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
                <button className="admin_button">
                    Admin
                </button>
                <button className="coord_button">
                    Coordinator
                </button>
            </div>
        </div>
      </div>
    )
  }
}

export default Login
