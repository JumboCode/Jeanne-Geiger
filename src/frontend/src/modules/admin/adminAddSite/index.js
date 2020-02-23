import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import BackButton from '../../../Comps/Back/back.js'

class adminAddSite extends React.Component {
  render () {
    return (
      <div>
        <h1>Adding a site</h1>
        <h1>{this.props.type}</h1>
        <BackButton />
      </div>
    )
  }
}

export default adminAddSite
