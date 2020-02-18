import React, {Component} from 'react'
import './back.css'


//This class defines a back button that goes back one page
//in the user's browser history when called
export default class BackButton extends React.Component {
  handleClick = () => {
    window.history.back();
  }

  render() {
    return (
      <img src="BackButton.svg" alt="Back Button" 
           onClick={this.handleClick}>
      </img>
    );
  }

}
