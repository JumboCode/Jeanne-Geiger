import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import Filter from '../../filter/filter.js'
import NavigationBar from '../../navbar/NavigationBar.js'

class siteOverview extends React.Component {
  render () {
    return (
        <div>
        <NavigationBar />
        <h1>Site overview</h1>
        <Filter />
        <a href="/site/case-view">case detail view</a>
        <a href="/site/add-case"> add a case</a>
        <h1>{this.props.type}</h1>
        </div>
    )
  }
}

export default siteOverview
