import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'

class detailView extends React.Component {
  render () {
    return (
      <div>
        <h1>site detail view</h1>
        <h1>{this.props.type}</h1>
      </div>
    )
  }
}

export default detailView 
