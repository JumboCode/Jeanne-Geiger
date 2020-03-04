import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import { DateInputObj, DropdownObj, TextInputObj, MultSelectionObj } from '../../coords/siteAddCase/util.js'
import NavigationBar from '../../navbar/NavigationBar.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import TabObj from '../../tabs.js'

const SITE_POST_URL = 'http://127.0.0.1:8000/api/communities/'

class adminAddSite extends React.Component {
  constructor () {
    super()
    this.state = {
      referral_sources: []
    }
  }

  doSubmit () {
    var referralSources = []
    var rs = document.getElementsByClassName('rs')

    for (var i = 0; i < rs.length; i++) {
      referralSources.push(rs[i].value)
    }

    var siteInfo = 'community_name=' + document.getElementById('community_name').value +
                   '&referral_sources={' + referralSources + '}'

    var sitePostRequest = new XMLHttpRequest()
    sitePostRequest.open('POST', SITE_POST_URL, true)
    sitePostRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    sitePostRequest.send(siteInfo)
    sitePostRequest.onload = function () {
      return JSON.parse(sitePostRequest.responseText).community_id
    }
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <form id='SitePost'>
          <div id='SiteForm'>
            <div class = "container">
              <Form.Row>
                <Col>
                  <TextInputObj id='community_name' title='Community Name'/>
                  <TextInputObj id='referral_source1' class='rs' title='Referral Source 1'/>
                  <TextInputObj id='referral_source2' class='rs' title='Referral Source 2'/>
                  <TextInputObj id='referral_source3' class='rs' title='Referral Source 3'/>
                </Col>
              </Form.Row>
            </div>
          </div>

          <div>
            <button type="submit" onClick={() => this.doSubmit()} value="Submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default adminAddSite
