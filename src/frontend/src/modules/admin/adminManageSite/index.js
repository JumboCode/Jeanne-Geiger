import React from 'react'
import './styles.css'
import { TextInputObj } from './util.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { BackButton } from '../../Back/back.js'
import NavigationBar from '../../navbar/NavigationBar.js'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { DOMAIN } from '../../../utils/index.js'

import Plus from './plus.png'
import Remove from './remove.png'

const COORDINATOR_POST_URL = DOMAIN + 'api/AddCoordinator/'
const ONE_COMMUNITY_URL = DOMAIN + 'api/OneCommunity/'

class adminManageSite extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  constructor () {
    super()
    this.state = {
      is_edit_site_view: false,
      community_id: this.getComIdFromUrl(),
      sources: [],
      coords: [],
      original_data: null
    }
  }

  componentDidMount () {
    this.setState({ is_edit_site_view: this.isEditSiteView() })
  }

  isEditSiteView () {
    const { cookies } = this.props
    var token = cookies.get('token')

    // Get referral sources, update state and prepopulate fields
    fetch(ONE_COMMUNITY_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          communityid: this.state.community_id
        }
      })
      .then(results => { return results.json() })
      .then(data => this.setState({ original_data: data }))
      .then(() => this.prepopulate())

    return true
  }

  getComIdFromUrl () {
    var vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value
    })
    return vars.com_id
  }

  prepopulate () {
    // site name prepopulate
    console.log(this.state.original_data);
    document.getElementById('site_name').value = this.state.original_data['community_name']

    // referral source prepopulate
    for (var i = 0; i < this.state.original_data["referral_sources"].length; i++) {
        if (i > 0) document.getElementById("add-referral").click();
        document.getElementById('referral_' + (i + 1)).value = this.state.original_data["referral_sources"][i]
    }
  }

  doSubmit () {
    var f = document.getElementsByTagName('form')[0]
    if (!f.checkValidity()) {
      return
    }

    const { cookies } = this.props
    var token = cookies.get('token')

    // add coordinators post request
    var coordData = this.getCoordData()
    var coordinatorsJson = []
    coordData[0].map(function (e, i) {
      var coord = `{"name": "`+ e + `", "email": "` + coordData[1][i] + `"}`
      coordinatorsJson.push(coord)
    })
    var coordInfo = '&coord_data={\"data\": [' + coordinatorsJson + ']}'
    console.log(coordInfo);

    var sitePostRequest = new XMLHttpRequest()
    sitePostRequest.open('POST', COORDINATOR_POST_URL, true)
    sitePostRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    sitePostRequest.setRequestHeader('Authorization', `Bearer ${token}`)
    sitePostRequest.setRequestHeader('COMMUNITYID', this.state.community_id)
    sitePostRequest.send(coordInfo)

    // edit site post request
    var referralSources = this.getSourceData()
    var siteInfo = 'community_name=' + document.getElementById('site_name').value +
                   '&referral_sources={' + referralSources + '}'
    console.log(siteInfo);
    alert();

    var sitePostRequest = new XMLHttpRequest()
    sitePostRequest.open('POST', ONE_COMMUNITY_URL, true)
    sitePostRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    sitePostRequest.setRequestHeader('Authorization', `Bearer ${token}`)
    console.log(this.state.community_id);
    sitePostRequest.setRequestHeader('COMMUNITYID', this.state.community_id)
    // sitePostRequest.onload = function () { window.location.href = '/admin' }
    sitePostRequest.send(siteInfo)
    console.log(sitePostRequest.response);
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
    // nameData.push(document.getElementById('coord_name_1').value)
    // emailData.push(document.getElementById('coord_email_1').value)
    for (var i = 0; i < this.state.coords.length; i++) {
      nameData.push(document.getElementById('coord_name_' + (i + 1)).value)
      emailData.push(document.getElementById('coord_email_' + (i + 1)).value)
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

    this.state.coords.splice(0, 1);

    for (var i = index + 1; i < this.state.coords.length; i++) {
      document.getElementById('coord_name_' + (i + 1)).value = nameData[i + 1]
      document.getElementById('coord_email_' + (i + 1)).value = emailData[i + 1]
    }

    this.setState({ coords: this.state.coords })
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <h2 class="title">Manage Site</h2>
        <h1>{this.props.type}</h1>
        <BackButton link='/admin' />
        <form>
          <div class="container">
            <Form.Row>
              <Col>
                <TextInputObj title='Site Name' id='site_name'/>
                {
                  this.state.coords.map((coords, i) => {
                    return (
                      <div key={i}>
                        <TextInputObj title={'Coordinator ' + ' Name'} id={'coord_name_' + (i + 1)} />
                        <TextInputObj title={'Coordinator ' + ' Email'} id={'coord_email_' + (i + 1)} />
                        <div class="buttons">
                          <button class="remove" onClick={(e) => this.removeCoord(i - 1)}><img class="logo" src={Remove} /></button>
                        </div>
                      </div>
                    )
                  })
                }
                <div class="buttons">
                  <button class="add" onClick={(e) => this.addCoord(e)}><img class="logo" src={Plus} /> Add another Coordinator</button>
                </div>
                To delete or edit coordinators, please go to <a href='https://auth0.com' target="_blank">Auth0</a>.
              </Col>
              <Col>
                <TextInputObj class="referral" title='Referral Source 1' id='referral_1' />
                {
                  this.state.sources.map((source, i) => {
                    return (
                      <div key={i}>
                        <TextInputObj class="referral" title={'Referral Source ' + (i + 2)} id={'referral_' + (i + 2)} />
                        <div class="buttons">
                          <button class="remove" type="button" onClick={(e) => this.removeSource(i)}><img class="logo" src={Remove} /></button>
                        </div>
                      </div>
                    )
                  })
                }
                <div class="buttons">
                  <button id="add-referral" class="add" onClick={(e) => this.addSource(e)}><img class="logo" src={Plus} /> Add another Referral Source</button>
                </div>
              </Col>
            </Form.Row>
          </div>
        </form>
        <div class="final">
          <button class="cancel_button" onClick={ function () { window.location.href = '/admin' }}>Cancel</button>
          <button type="submit" class="save_button" onClick={() => this.doSubmit()} value="Submit">Submit</button>
        </div>
      </div>
    )
  }
}

export default withCookies(adminManageSite);
