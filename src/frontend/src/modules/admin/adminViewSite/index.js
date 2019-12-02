import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'

class adminViewSite extends React.Component {
  render () {
    return (
      <div>
        <h1>Viewing a site</h1>
        <h1>{this.props.type}</h1>
      </div>
    )
  }
}

export default adminViewSite
