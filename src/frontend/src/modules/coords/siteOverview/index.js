import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'

class siteOverview extends React.Component {
  render () {
    return (
      <div>
        <h1>Site overview</h1>
	<a href="/site/case-view">case detail view</a>
        <h1>{this.props.type}</h1>
      </div>
    )
  }
}

export default siteOverview
