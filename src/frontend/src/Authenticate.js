import { Route, BrowserRouter, Switch, Link} from 'react-router-dom';
import React from 'react';
import App from './App.js';

function Authenticate (props) {
  var username;
  var token = localStorage.getItem('token');
  console.log("LOCAL STORAGE", localStorage.getItem('token'));
  fetch('http://localhost:8000/api/current_user/', {
    headers: {
      Authorization: `JWT ${token}`
    }
  }).then(res => res.json())
  .then(json => {
    username = json.username;

    if (props.path == '/site' || props.path == '/site' ){
      if (username == 'nate'){
        return true;
      }
      //If user community person
    }else{
      if (username == 'nate'){
        return true;
      }else{
        return false;
      }
    }
    return true;
  });




  };    /*
    .then(function(response){
      console.log("AFTER")
      if (response.status == 401){
        console.log("401");
        return false;
      }
      else{
        console.log("Response", response);
        response = response.json();
      }
    }).then(response => {
        console.log("JSON ", response);
    });
    */

const PrivateRoute = (props) => {
  if (Authenticate(props.path)){
    console.log("AUTHENTICATION");
    return (
    <Route exact path= {props.path} component = {props.component} type = {props.type}/>
    );
  }else{
    return (
      <App />
      );
  }
}



export default PrivateRoute;

