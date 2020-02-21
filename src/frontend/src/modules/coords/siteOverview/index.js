import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
// import { DateInputObj, DropdownObj, TextInputObj, MultSelectionObj } from './util.js'
import { Tabs, Tab } from 'react-bootstrap-tabs'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class siteOverview extends React.Component {
  render () {
    return (
      <div>
        <h1>Site overview</h1>
        <a href="/site/case-view">case detail view</a>
        <a href="/site/add-case"> add a case</a>
        <Tabs onSelect={(index, label) => console.log(label + 'selected')}>
          <Tab label="Victim">
            <div class="container"> Victim Content
            </div>
          </Tab>
          <Tab label="Abuser">
            <div class="container"> Abuser Content
            </div>
          </Tab>
          <Tab label="Risk Factors" >
            <div class="container"> Risk Factors Content
            </div>
          </Tab>
          <Tab label="Outcomes">
            <div class="container"> Outcomes Content
            </div>
          </Tab>
        </Tabs>
        <h1>{this.props.type}</h1>
      </div>
    )
  }
}

export default siteOverview
