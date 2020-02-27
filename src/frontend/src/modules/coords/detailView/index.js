import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import TabObj from '../../tabs.js'

class detailView extends React.Component {
  render () {
    return (
      <div>
        <h1>site detail view</h1>
        <TabObj selectFunc={(index, label) => console.log(label + 'selected')}/>
      </div>
    )
  }
}

export default detailView
