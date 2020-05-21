import React from 'react'
import { Tabs, Tab } from 'react-bootstrap-tabs'

const TabObj = (props) => {
  return (
    <Tabs defaultActiveKey='victim' activeKey={props.addKey} onSelect={props.selectFunc}>
      <Tab eventKey="victim" label='Victim'>
        <div className="container">
        </div>
      </Tab>
      <Tab eventKey="abuser" label='Abuser'>
        <div className="container">
        </div>
      </Tab>
      <Tab eventKey="risk_factors" label='Risk Factors'>
        <div className="container">
        </div>
      </Tab>
      <Tab eventKey="outcomes" label='Outcomes'>
        <div className="container">
        </div>
      </Tab>
    </Tabs>
  )
}

export default TabObj
