import { Route, BrowserRouter, Switch, Link} from 'react-router-dom';
import React from 'react'

function Authenticate (props) {
  var token = localStorage.getItem('token');
  console.log("LOCAL STORAGE", localStorage.getItem('token'));
  fetch('http://localhost:8000/api/current_user/', {
    headers: {
      Authorization: `JWT ${token}`
    }
  }).then(res => res.json())
  .then(json => {
    console.log("APP auth ", json);
  });
  /*
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
  return true;
}

const PrivateRoute = (props) => {
  if (Authenticate(props.route)){
    console.log("AUTHENTICATION");
    return (
    <Route exact path= {props.path} component = {props.component} type = {props.type}/>
    );
  }
}



export default PrivateRoute;

