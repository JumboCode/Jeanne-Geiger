import React, { Component } from 'react'
import backLogo from './BackButton.png'
import './back.css'

// This class defines a back button that goes back one page
// in the user's browser history when called
export default class BackButton extends React.Component {
  handleClick () {
    window.history.back()
  }

  render () {
    return (
        <img className="backbutton" src={backLogo} alt="Back Button" onClick={(e) => this.handleClick(e)}/>
    )
  }
}
