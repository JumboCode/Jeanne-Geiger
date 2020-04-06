import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import NavigationBar from '../navbar/NavigationBar.js'

class accRecovery extends React.Component {
  render () {
    return (
      <div>
        <NavigationBar />
        <h1>Recover Account</h1>
      </div>
    )
  }
}

export default accRecovery
