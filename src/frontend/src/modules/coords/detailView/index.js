import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import NavigationBar from '../../navbar/NavigationBar.js'
import TabObj from '../../tabs.js'

const GET_CASE_URL = 'http://localhost:8000/api/one-case/'

class detailView extends React.Component {
  constructor () {
    super()
    this.state = {
      case: []
    }
  }

  componentDidMount () {
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
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value
    })
    return vars.case_id
  }

  getTabInfo (tabName) {
    console.log(tabName)
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

    // Show the current tab, and add an 'active' class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block'
  }

  showTab (index) {
    if (index === 0) { this.getTabInfo('Victim') } else if (index === 1) { this.getTabInfo('Abuser') } else if (index === 2) { this.getTabInfo('RiskFactors') } else { this.getTabInfo('Outcomes') }
  }

  getVictimTabInfo () {
    if (this.state.case.victim_id !== undefined) {
      return (
        <div>
          <p>Name: {this.state.case.victim_id.name}</p>
          <p>DOB: {this.state.case.victim_id.dob}</p>
          <p>Gender: {this.state.case.victim_id.gender}</p>
          <p>Race/Ethnicity: {this.state.case.victim_id.race_ethnicity}</p>
          <p>Age at Case Acceptance: {this.state.case.victim_id.age_at_case_acceptance}</p>
          <p>Primary Language: {this.state.case.victim_id.primary_language}</p>
          <p>Town: {this.state.case.victim_id.town}</p>
          <p>Relationship Type: {this.state.case.relationship_type}</p>
          <p>Relationship Length: {this.state.case.relationship_len}</p>
          <p>Minor in Home: {this.state.case.minor_in_home}</p>
          <p>Referral Source: {this.state.case.referral_source}</p>
          <p>Date at Case Acceptance: {this.state.case.date_accepted}</p>
        </div>
      )
    }
  }

  getAbuserTabInfo () {
    if (this.state.case.abuser_id !== undefined) {
      return (
        <div>
          <p>Name: {this.state.case.abuser_id.name}</p>
          <p>DOB: {this.state.case.abuser_id.dob}</p>
          <p>Gender: {this.state.case.abuser_id.gender}</p>
          <p>Race/Ethnicity: {this.state.case.abuser_id.race_ethnicity}</p>
          <p>Age at Case Acceptance: {this.state.case.abuser_id.age_at_case_acceptance}</p>
          <p>Primary Language: {this.state.case.abuser_id.primary_language}</p>
          <p>Town: {this.state.case.abuser_id.town}</p>
        </div>
      )
    }
  }

  getOutcomeTabInfo () {
    if (this.state.case.outcome_id !== undefined) {
      return (
        <div>
          <p>Connection to Domestic Violence Services: {this.state.case.outcome_id.connection_to_domestic_violence_services}</p>
          <p>Engagement in Ongoing Domestic Violence Services: {this.state.case.outcome_id.engagement_in_ongoing_domestic_violence_services}</p>
          <p>Charges File at or After Case Acceptance: {this.state.case.outcome_id.charges_filed_at_or_after_case_acceptance}</p>
          <p>Sentencing Outcomes Disposition: {this.state.case.outcome_id.sentencing_outcomes_disposition}</p>
          <p>Sentencing Outcomes Sentence: {this.state.case.outcome_id.sentencing_outcomes_sentence}</p>
        </div>
      )
    }
  }

  getRiskFactorTabInfo () {
    if (this.state.case.risk_factor_id !== undefined) {
      return (
        <div>
          <p> Has the physical violence increased in severity or frequency over the past year? {this.state.case.risk_factor_id.violence_increased}</p>
          <p>Have you left him/her after living together in the past year? {this.state.case.risk_factor_id.attempted_leaving}</p>
          <p>Does he/she control most or all of your daily activities? {this.state.case.risk_factor_id.control_activites}</p>
          <p>Has he/she tried to kill you? {this.state.case.risk_factor_id.attempted_murder}</p>
          <p>Has he/she ever threatened to kill you? {this.state.case.risk_factor_id.threatened_murder}</p>
          <p>Has he/she used a weapon against you or threatened you with a lethal weapon? {this.state.case.risk_factor_id.weapon_threat}</p>
          <p>Has he/she ever tried to choke (strangle) you? {this.state.case.risk_factor_id.attempted_choke}</p>
          <p>Has he/she choked (strangled) you multiple times? {this.state.case.risk_factor_id.multiple_choked}</p>
          <p>Do you believe he/she is capable of killing you? {this.state.case.risk_factor_id.killing_capable}</p>
          <p>Does he/she own a gun? {this.state.case.risk_factor_id.owns_gun}</p>
          <p>Has he/she ever threatened or tried to commit suicide? {this.state.case.risk_factor_id.suicide_threat_or_attempt}</p>
          <p>Is he/she unemployed? {this.state.case.risk_factor_id.is_unemployed}</p>
          <p>Has he/she avoided being arrested for domestic violence? {this.state.case.risk_factor_id.avoided_arrest}</p>
          <p>Do you have a child that is not his/hers? {this.state.case.risk_factor_id.unrelated_child}</p>
          <p>Does he/she use illegal drugs? {this.state.case.risk_factor_id.uses_illegal_drugs}</p>
          <p>Is he/she an alcoholic or problem drinker? {this.state.case.risk_factor_id.is_alcoholic}</p>
          <p>Has he/she ever forced you to have sex when you did not wish to do so? {this.state.case.risk_factor_id.forced_sex}</p>
          <p>Is he/she violently or constantly jealous? {this.state.case.risk_factor_id.constantly_jealous}</p>
          <p>Has he/she ever beaten you while you were pregnant? {this.state.case.risk_factor_id.pregnant_abuse}</p>
          <p>Threatens to harm victim’s children? {this.state.case.risk_factor_id.children_threatened}</p>
          <p>Does he/she spy on you, leaving threatening notes or messages? {this.state.case.risk_factor_id.has_spied}</p>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        <NavigationBar />
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
    )
  }
}

export default detailView
