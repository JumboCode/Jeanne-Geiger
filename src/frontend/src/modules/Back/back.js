import React from 'react'
import backLogo from './BackButton.png'
import './back.css'

// This class defines a back button that goes back one page
// in the user's browser history when called
const BackButton = (props) => {
  return (
    <div className="backbutton">
      <img src={backLogo} alt="Back Button" onClick={function () { window.location.href = props.link }}/>
    </div>
  )
}

export { BackButton }
