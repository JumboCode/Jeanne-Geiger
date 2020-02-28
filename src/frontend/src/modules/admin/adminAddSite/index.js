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

//   componentDidMount () {
//     this.showTab(0)
//     fetch(COMMUNITY_LIST_URL
//     ).then(results => {
//       return results.json()
//     }).then(data => {
//       for (var i = 0; i < data.length; i++) {
//         if (data[i].community_id === 1) {
//           this.setState({ referral_sources: data[i].referral_sources })
//         }
//       }
//     })
//   }

  doSubmit () {
    var siteInfo = '&community_name=' + document.getElementById('community_name').value +
                   '&referral_source=' + document.getElementById('referral_source').value // might need to change for array of strings

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
                  <TextInputObj id='referral_sources' title='Referral Sources'/>
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
