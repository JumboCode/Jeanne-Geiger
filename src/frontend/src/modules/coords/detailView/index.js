import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import BackButton from '../../../Comps/Back/back.js'

class detailView extends React.Component {
  render () {
    return (
      <div>
        <h1>site detail view</h1>
        <BackButton />
        <h1>{this.props.type}</h1>
      </div>
    )
  }
}

export default detailView
