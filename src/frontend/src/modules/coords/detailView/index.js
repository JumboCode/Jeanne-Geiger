import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
// import { DateInputObj, DropdownObj, TextInputObj, MultSelectionObj } from './util.js'
import { Tabs, Tab } from 'react-bootstrap-tabs'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'

class detailView extends React.Component {
  render () {
    return (
      <div>
        <h1>site detail view</h1>
        <Tabs onSelect={(index, label) => console.log(label + 'selected')}>
          <Tab label="Victim" class="tab">
            <div class="container"> Victim Content
            </div>
          </Tab>
          <Tab label="Abuser" class="tab">
            <div class="container"> Abuser Content
            </div>
          </Tab>
          <Tab label="Risk Factors" class="tab">
            <div class="container"> Risk Factors Content
            </div>
          </Tab>
          <Tab label="Outcomes"class="tab">
            <div class="container"> Outcomes Content
            </div>
          </Tab>
        </Tabs>
        {/* <h1>{this.props.type}</h1> */}
      </div>
    )
  }
}

export default detailView
