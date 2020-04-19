import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import NavigationBar from '../../navbar/NavigationBar.js'
import editButton from './editButton.png'
import { BackButton } from '../../Back/back.js'
import TabObj from '../../tabs.js'
import { Row, Col } from 'react-bootstrap'

const GET_CASE_URL = 'http://localhost:8000/api/one-case/'

class detailView extends React.Component {
  constructor () {
    super()
    this.state = {
      case: [],
      case_id: []
    }
  }

  componentDidMount () {
    this.setState({ case_id: this.getCaseIdFromUrl() })
    this.showTab(0)
    fetch(GET_CASE_URL, {
      headers: {
        caseid: this.getCaseIdFromUrl()
      }
    })
      .then(results => { return results.json() })
      .then(data => this.setState({ case: data }))
  }

  getCaseIdFromUrl () {
    var vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value
    })
    return vars.case_id
  }

  getTabInfo (tabName) {
    var i, tabcontent, tablinks

    // Get all elements with class='tabcontent' and hide them
    tabcontent = document.getElementsByClassName('tabcontent')
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none'
    }

    // Get all elements with class='tablinks' and remove the class 'active'
    tablinks = document.getElementsByClassName('tablinks')
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '')
    }

    // Show the current tab
    document.getElementById(tabName).style.display = 'block'
  }

  showTab (index) {
    if (index === 0) { this.getTabInfo('Victim') } else if (index === 1) { this.getTabInfo('Abuser') } else if (index === 2) { this.getTabInfo('RiskFactors') } else { this.getTabInfo('Outcomes') }
  }

  getCaseActiveStatus () {
    if (this.state.case !== undefined) {
      return (
        <div>
          <p id={this.state.case.active_status}>{this.state.case.active_status}</p>
        </div>
      )
    }

    return (
      <div>
        <p> </p>
      </div>
    )
  }

  getVictimTabInfo () {
    if (this.state.case.victim_id !== undefined) {
      return (
        <div>
          <Row>
            <Col>
              <p>Name: </p>
              <h3>{this.state.case.victim_id.name}</h3>
              <p>Gender: </p>
              <h3>{this.state.case.victim_id.gender}</h3>
              <p>DOB: </p>
              <h3>{this.state.case.victim_id.dob}</h3>
              <p>Race/Ethnicity: </p>
              <h3> {this.state.case.victim_id.race_ethnicity}</h3>
              <p>Age at Case Acceptance: </p>
              <h3> {this.state.case.victim_id.age_at_case_acceptance}</h3>
              <p>Primary Language:</p>
              <h3>{this.state.case.victim_id.primary_language}</h3>
            </Col>

            <Col>
              <p>Town: </p>
              <h3> {this.state.case.victim_id.town}</h3>
              <p>Relationship Type: </p>
              <h3> {this.state.case.relationship_type}</h3>
              <p>Relationship Length: </p>
              <h3> {this.state.case.relationship_len}</h3>
              <p>Minor in Home: </p>
              <h3> {this.state.case.minor_in_home}</h3>
              <p>Referral Source: </p>
              <h3> {this.state.case.referral_source}</h3>
              <p>Date at Case Acceptance: </p>
              <h3> {this.state.case.date_accepted}</h3>
            </Col>
          </Row>
        </div>
      )
    }
  }

  getAbuserTabInfo () {
    if (this.state.case.abuser_id !== undefined) {
      return (
        <div>
          <Row>
            <Col>
              <p>Name: </p>
              <h3> {this.state.case.abuser_id.name}</h3>
              <p>DOB: </p>
              <h3> {this.state.case.abuser_id.dob}</h3>
              <p>Gender: </p>
              <h3> {this.state.case.abuser_id.gender}</h3>
              <p>Race/Ethnicity: </p>
              <h3>{this.state.case.abuser_id.race_ethnicity}</h3>
            </Col>

            <Col>
              <p>Age at Case Acceptance: </p>
              <h3>{this.state.case.abuser_id.age_at_case_acceptance}</h3>
              <p>Primary Language: </p>
              <h3>{this.state.case.abuser_id.primary_language}</h3>
              <p>Town: </p>
              <h3>{this.state.case.abuser_id.town}</h3>

            </Col>
          </Row>

        </div>
      )
    }
  }

  getOutcomeTabInfo () {
    if (this.state.case.outcome_id !== undefined) {
      return (
        <div>
          <Row>
            <Col>
              <p>Victim Name: </p>
              <h3>{this.state.case.victim_id.name}</h3>
              <p>Abuser Name: </p>
              <h3>{this.state.case.abuser_id.name}</h3>
            </Col>

            <Col xs={8}>
              <p>Connection to Domestic Violence Services: </p>
              <p>Engagement in Ongoing Domestic Violence Services: </p>
              <p>Charges File at or After Case Acceptance: </p>
              <p>Sentencing Outcomes Disposition: </p>
              <p>Sentencing Outcomes Sentence: </p>
            </Col>

            <Col>
              <p>{this.state.case.outcome_id.connection_to_domestic_violence_services}</p>
              <p>{this.state.case.outcome_id.engagement_in_ongoing_domestic_violence_services}</p>
              <p>{this.state.case.outcome_id.charges_filed_at_or_after_case_acceptance}</p>
              <p>{this.state.case.outcome_id.sentencing_outcomes_disposition}</p>
              <p>{this.state.case.outcome_id.sentencing_outcomes_sentence}</p>
            </Col>
          </Row>

        </div>

      )
    }
  }

  getRiskFactorTabInfo () {
    if (this.state.case.risk_factor_id !== undefined) {
      return (
        <div>
          <Row>
            <Col>
              <p>Victim Name: </p>
              <h3>{this.state.case.victim_id.name}</h3>
              <p>Abuser Name: </p>
              <h3>{this.state.case.abuser_id.name}</h3>
            </Col>

            <Col xs={8}>
              <p>Has the physical violence increased in severity or frequency over the past year? </p>
              <p>Have you left him/her after living together in the past year? </p>
              <p>Does he/she control most or all of your daily activities? </p>
              <p>Has he/she tried to kill you? </p>
              <p>Has he/she ever threatened to kill you? </p>
              <p>Has he/she used a weapon against you or threatened you with a lethal weapon? </p>
              <p>Has he/she ever tried to choke (strangle) you? </p>
              <p>Has he/she choked (strangled) you multiple times? </p>
              <p>Do you believe he/she is capable of killing you? </p>
              <p>Does he/she own a gun? </p>
              <p>Has he/she ever threatened or tried to commit suicide? </p>
              <p>Is he/she unemployed? </p>
              <p>Has he/she avoided being arrested for domestic violence? </p>
              <p>Do you have a child that is not his/hers? </p>
              <p>Does he/she use illegal drugs? </p>
              <p>Is he/she an alcoholic or problem drinker? </p>
              <p>Has he/she ever forced you to have sex when you did not wish to do so? </p>
              <p>Is he/she violently or constantly jealous? </p>
              <p>Has he/she ever beaten you while you were pregnant? </p>
              <p>Threatens to harm victim’s children? </p>
              <p>Does he/she spy on you, leaving threatening notes or messages? </p>
            </Col>

            <Col>
              <p>{this.state.case.risk_factor_id.violence_increased}</p>
              <p>{this.state.case.risk_factor_id.attempted_leaving}</p>
              <p>{this.state.case.risk_factor_id.control_activites}</p>
              <p>{this.state.case.risk_factor_id.attempted_murder}</p>
              <p>{this.state.case.risk_factor_id.threatened_murder}</p>
              <p>{this.state.case.risk_factor_id.weapon_threat}</p>
              <p>{this.state.case.risk_factor_id.attempted_choke}</p>
              <p>{this.state.case.risk_factor_id.multiple_choked}</p>
              <p>{this.state.case.risk_factor_id.killing_capable}</p>
              <p>{this.state.case.risk_factor_id.owns_gun}</p>
              <p>{this.state.case.risk_factor_id.suicide_threat_or_attempt}</p>
              <p>{this.state.case.risk_factor_id.is_unemployed}</p>
              <p>{this.state.case.risk_factor_id.avoided_arrest}</p>
              <p>{this.state.case.risk_factor_id.unrelated_child}</p>
              <p>{this.state.case.risk_factor_id.uses_illegal_drugs}</p>
              <p>{this.state.case.risk_factor_id.is_alcoholic}</p>
              <p>{this.state.case.risk_factor_id.forced_sex}</p>
              <p>{this.state.case.risk_factor_id.constantly_jealous}</p>
              <p>{this.state.case.risk_factor_id.pregnant_abuse}</p>
              <p>{this.state.case.risk_factor_id.children_threatened}</p>
              <p>{this.state.case.risk_factor_id.has_spied}</p>
            </Col>
          </Row>

        </div>
      )
    }
  }

  openEditClick () {
    window.location.href = '/site/edit-case?case_id=' + this.state.case_id
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <div class="buttonsContainer">
          <BackButton link='site'/>
          <input type="image" id="editButton" src={editButton} onClick={() => this.openEditClick()}/>
        </div>
        <div id='active_status'>
          {this.getCaseActiveStatus()}
        </div>
        <div class = "container">
          <TabObj selectFunc={(index, label) => this.showTab(index)}/>
          <div id='Victim' className='tabcontent'>
            {this.getVictimTabInfo()}
          </div>
          <div id='Abuser' className='tabcontent'>
            {this.getAbuserTabInfo()}
          </div>
          <div id='Outcomes' className='tabcontent'>
            {this.getOutcomeTabInfo()}
          </div>
          <div id='RiskFactors' className='tabcontent'>
            {this.getRiskFactorTabInfo()}
          </div>
        </div>
      </div>
    )
  }
}

export default detailView
