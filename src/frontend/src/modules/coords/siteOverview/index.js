import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import Button from 'react-bootstrap/Button'
import TabObj from '../../tabs.js'

class siteOverview extends React.Component {
  render () {
    return (
      <div>
        <h1>Site overview</h1>
        <a href="/site/case-view">case detail view</a>
        <a href="/site/add-case"> add a case</a>
        <TabObj selectFunc={(index, label) => console.log(label + 'selected')}/>
      </div>
    )
  }
}

export default siteOverview
