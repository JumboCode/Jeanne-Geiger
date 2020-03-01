import React, { Component } from 'react'
import backLogo from './BackButton.png'
import './back.css'

// This class defines a back button that goes back one page
// in the user's browser history when called
export default class BackButton extends React.Component {
  /*handleClick = () => {
    window.history.back()
  }*/

  render () {
    return (
      <div className="backbutton">
        <img src={backLogo} alt="Back Button" onClick={window.history.back}/>
      </div>
    )
  }
}
