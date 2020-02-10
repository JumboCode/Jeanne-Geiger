import React, { Component } from 'react'
import './App.css'

/* import { adminComOverview } from './modules/admin/adminComOverview'
import { adminHomepage } from './modules/admin/adminHomepage'
import { adminViewCaseDetail } from './modules/admin/adminViewCaseDetail'
import Login from './modules/logIn'

import { addCase } from './modules/comManager/addCase'
import { comOverview } from './modules/comManager/comOverview'
import { detailView } from './modules/comManager/detailView'
import { editCase } from './modules/comManager/editCase' */
import AppRouter from './routes.js'

import Nav from './modules/logIn/Nav';
import LoginForm from './modules/logIn/LoginForm';
import SignupForm from './modules/logIn/SignupForm';

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
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      token: localStorage.getItem('token')
    }
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(json => {
          if(json.token){
            localStorage.setItem('token', json.token);
            this.setState({
              logged_in: true,
              displayed_form: '',
              username: json.user.username,
              token: json.token
            });
          }else{
            this.setState({
              logged_in: false,
              displayed_form: '',
              username: "ERROR",
              token: "ERROR"

            });
          }
        });
};

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} />;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }
    if (this.state.username != "ERROR"){
      return (
        <div className="App">
          <Nav
            logged_in={this.state.logged_in}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
          />
          {form}
          <h3>
            {this.state.logged_in
              ? `Hello, ${this.state.username}! \n Here is your token:\n${this.state.token}`
              : 'Please Log In'}
          </h3>
        </div>
      );
    }else{
      return (
        <h3>INCORRECT PW</h3>
      );
    }

  }
}

export default App
