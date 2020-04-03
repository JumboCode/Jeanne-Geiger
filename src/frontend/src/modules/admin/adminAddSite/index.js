import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import { TextInputObj } from './util.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import NavigationBar from '../../navbar/NavigationBar.js'

const SITE_POST_URL = 'placeholder'

class adminAddSite extends React.Component {
  doSitePost() {
    return 'site_name=' + document.getElementById('site_name').value +
    '&coord_name=' + document.getElementById('coord_name').value +
    '&coord_email=' + document.getElementById('coord_email').value +
    '&referral_1=' + document.getElementById('referral_1').value +
    '&referral_2=' + document.getElementById('referral_2').value
  }

  doSubmit () {
    var siteInfo = this.doSitePost()

    var sitePostRequest = new XMLHttpRequest()
    sitePostRequest.open('POST', SITE_POST_URL, true)
    sitePostRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    sitePostRequest.send(siteInfo)
    sitePostRequest.onload = function () {
      return JSON.parse(sitePostRequest.responseText).site_id
    }
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <h2 class="title">Add New Site</h2>
        <h1>{this.props.type}</h1>
        <div class="container">
          <Form.Row>
            <Col>
              <TextInputObj title='Site Name' id='site_name'/>
              <TextInputObj title='Coordinator Name' id='coord_name'/>
              <TextInputObj title='Coordinator Email' id='coord_email'/>
            </Col>
            <Col>
              <TextInputObj title='Referral Source 1' id='referral_1'/>
              <TextInputObj title='Referral Source 2' id='referral_2'/>
            </Col>
          </Form.Row>
        </div>
        <div class="buttons">
          <button class="cancel_button">Cancel</button>
          <button type="save" class="save_button" onClick={() => this.doSubmit()} value="save">Save</button>
        </div>
      </div>
    )
  }
}

export default adminAddSite
