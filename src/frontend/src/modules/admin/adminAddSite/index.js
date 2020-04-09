import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import BackButton from '../../Back/back.js'
import NavigationBar from '../../navbar/NavigationBar.js'

class adminAddSite extends React.Component {
  render () {
    return (
      <div>
        <NavigationBar />
        <h1>Adding a site</h1>
        <h1>{this.props.type}</h1>
        <BackButton />
      </div>
    )
  }
}

export default adminAddSite
