import React from 'react'
import { Tabs, Tab } from 'react-bootstrap-tabs'

const TabObj = (props) => {
  return (
    <Tabs defaulActiveKey='victim' onSelect={props.selectFunc}>
      <Tab eventKey="victim" label='Victim'>
        <div class="container">
        </div>
      </Tab>
      <Tab eventKey="abuser" label='Abuser'>
        <div class="container">
        </div>
      </Tab>
      <Tab eventKey="risk_factors" label='Risk Factors'>
        <div class="container">
        </div>
      </Tab>
      <Tab eventKey="outcomes" label='Outcomes'>
        <div class="container">
        </div>
      </Tab>
    </Tabs>
  )
}

export default TabObj
