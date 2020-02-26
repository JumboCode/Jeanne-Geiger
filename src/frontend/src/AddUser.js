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

class AddUser extends Component {
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
    console.log("ADD USSSERR")
    if (this.state.logged_in) {
      fetch('http://localhost:8000/api/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log("APP ", json);
          this.setState({ username: json.username });
        });
    }
  }

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

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    form = <SignupForm handle_signup={this.handle_signup} />;

    if (this.state.username != "ERROR"){
      return (
        <div className="App">
          <Nav
            type = "Signup"
            logged_in={this.state.logged_in}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
          />
          {form}
          <h3>
            {this.state.logged_in
              ? `Hello, ${this.state.username}! \n Here is your token:\n${this.state.token}` // This token statment is for debuging!
              : 'Please Log In'}
          </h3>
        </div>
      );
    }else{
      return (
        <div className="App">
          <LoginForm handle_login={this.handle_login} />
          <h3>INCORRECT PW Please try again</h3>
        </div>
      );
    }

  }
}

export default AddUser
