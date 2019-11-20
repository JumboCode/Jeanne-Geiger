import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'

class adminComOverview extends React.Component {
  render () {
    return (
      <div>
        <h1>admin community</h1>
        <h1>{this.props.type}</h1>
      </div>
    )
  }
}

export default adminComOverview
