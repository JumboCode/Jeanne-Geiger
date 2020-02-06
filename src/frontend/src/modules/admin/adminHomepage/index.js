import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'

class adminHomepage extends React.Component {
  render () {
    return (
      <div>
        <h1>admin page</h1>
        <a href="/admin/add-site">Add a site</a>
        <a href="/admin/view-site">View a site</a>
        <h1>{this.props.path}</h1>
      </div>
    )
  }
}

export default adminHomepage
