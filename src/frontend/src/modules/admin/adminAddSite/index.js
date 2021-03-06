import React from 'react'
import './styles.css'
import { TextInputObj } from './util.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { BackButton } from '../../Back/back.js'
import NavigationBar from '../../navbar/NavigationBar.js'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import { DOMAIN } from '../../../utils/index.js'
import Loading from '../../logIn/Loading.js'

import Plus from './plus.png'
import Remove from './remove.png'

const SITE_POST_URL = DOMAIN + 'api/communities/'

class adminAddSite extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor () {
    super()
    this.state = {
      loading: false,
      sources: [],
      coords: []
    }
  }

  doSubmit () {
    var f = document.getElementsByTagName('form')[0]
    if (!f.checkValidity()) {
      alert('Please fill out all fields.')
      return
    }

    this.setState({ loading: true })
    var referralSources = this.getSourceData()
    var coordData = this.getCoordData()

    var coordinators = coordData[0].map(function (e, i) {
      return '{' + [e, coordData[1][i]] + '}'
    })

    var coordinatorsJson = []
    coordData[0].map(function (e, i) {
      var coord = '{"name": "' + e + '", "email": "' + coordData[1][i] + '"}'
      coordinatorsJson.push(coord)
      return coord
    })

    var siteInfo = 'community_name=' + document.getElementById('site_name').value +
                   '&coordinators={' + coordinators + '}' +
                   '&referral_sources={' + referralSources + '}' +
                   '&coord_data={"data": [' + coordinatorsJson + ']}'

    const { cookies } = this.props
    var token = cookies.get('token')
    if (token === '') {
      window.location.reload()
    }

    var sitePostRequest = new XMLHttpRequest()
    sitePostRequest.open('POST', SITE_POST_URL, true)
    sitePostRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    sitePostRequest.setRequestHeader('Authorization', `Bearer ${token}`)
    sitePostRequest.onload = function () { window.location.href = '/admin' }
    sitePostRequest.send(siteInfo)
  }

  getSourceData () {
    var data = []
    data.push(document.getElementById('referral_1').value)
    for (var i = 0; i < this.state.sources.length; i++) {
      data.push(document.getElementById('referral_' + (i + 2)).value)
    }
    return data
  }

  addSource () {
    this.setState({ sources: [...this.state.sources, ''] })
  }

  removeSource (index) {
    var data = this.getSourceData()
    for (var i = index + 1; i < this.state.sources.length; i++) {
      document.getElementById('referral_' + (i + 1)).value = data[i + 1]
    }
    this.state.sources.pop()
    this.setState({ sources: this.state.sources })
  }

  getCoordData () {
    var nameData = []
    var emailData = []
    nameData.push(document.getElementById('coord_name_1').value)
    emailData.push(document.getElementById('coord_email_1').value)
    for (var i = 0; i < this.state.coords.length; i++) {
      nameData.push(document.getElementById('coord_name_' + (i + 2)).value)
      emailData.push(document.getElementById('coord_email_' + (i + 2)).value)
    }
    return [nameData, emailData]
  }

  addCoord () {
    this.setState({ coords: [...this.state.coords, ''] })
  }

  removeCoord (index) {
    var coordData = this.getCoordData()
    var nameData = coordData[0]
    var emailData = coordData[1]
    for (var i = index + 1; i < this.state.coords.length; i++) {
      document.getElementById('coord_name_' + (i + 1)).value = nameData[i + 1]
      document.getElementById('coord_email_' + (i + 1)).value = emailData[i + 1]
    }
    this.state.coords.pop()
    this.setState({ coords: this.state.coords })
  }

  render () {
    const loading = this.state.loading
    return (
      <div>
        <NavigationBar />

        <h2 class="title">Add New Site</h2>
        <h1>{this.props.type}</h1>
        <BackButton link='/admin' />
        <form>
          <div class="container">
            <Form.Row>
              <Col>
                <TextInputObj title='Site Name' id='site_name'/>
                <TextInputObj title='Coordinator 1 Name' id='coord_name_1'/>
                <TextInputObj title='Coordinator 1 Email' id='coord_email_1'/>
                {
                  this.state.coords.map((coords, i) => {
                    return (
                      <div key={i}>
                        <TextInputObj title={'Coordinator ' + (i + 2) + ' Name'} id={'coord_name_' + (i + 2)} />
                        <TextInputObj title={'Coordinator ' + (i + 2) + ' Email'} id={'coord_email_' + (i + 2)} />
                        <div class="buttons">
                          <button class="remove" onClick={(e) => this.removeCoord(i)}><img class="logo" src={Remove} alt='logo' /></button>
                        </div>
                      </div>
                    )
                  })
                }
                <div class="buttons">
                  <button class="add" onClick={(e) => this.addCoord(e)}><img class="logo" src={Plus} alt='add' /> Add another Coordinator</button>
                </div>
              </Col>
              <Col>
                <TextInputObj class="referral" title='Referral Source 1' id='referral_1' />
                {
                  this.state.sources.map((source, i) => {
                    return (
                      <div key={i}>
                        <TextInputObj class="referral" title={'Referral Source ' + (i + 2)} id={'referral_' + (i + 2)} />
                        <div class="buttons">
                          <button class="remove" onClick={(e) => this.removeSource(i)}><img class="logo" src={Remove} alt='remove'/></button>
                        </div>
                      </div>
                    )
                  })
                }
                <div class="buttons">
                  <button class="add" onClick={(e) => this.addSource(e)}><img class="logo" src={Plus} alt='add' /> Add another Referral Source</button>
                </div>

              </Col>
            </Form.Row>
          </div>
        </form>
        <div class="final">
          <button class="cancel_button" onClick={ function () { window.location.href = '/admin' }}>Cancel</button>
          <button type="submit" class="save_button" onClick={() => this.doSubmit()} value="Submit">Submit</button>
        </div>
        {loading ? (<Loading />) : null}
      </div>
    )
  }
}

export default withCookies(adminAddSite)
