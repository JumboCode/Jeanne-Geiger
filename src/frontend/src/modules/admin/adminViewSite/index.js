import React, { Component } from 'react'
import './styles.css'
import ObjectTable from './table.js'
import { render } from 'react-dom'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '../../dateRangePicker.js';

const Wrapper = styled.div`
  display: grid;
  margin-left: 7%;
  column-gap : .5%
  grid-template-columns: repeat(3, 210px);
  grid-template-rows: repeat(2, 210px);
  grid-auto-flow: column;
  text-decoration: none;
`

const COMMUNITY_LIST_URL = 'http://127.0.0.1:8000/api/communities/'
const VICTIM_INFO_URL = 'http://127.0.0.1:8000/api/DVHRTHighRiskVictimInfo/'
const ABUSER_INFO_URL = 'http://127.0.0.1:8000/api/DVHRTHighRiskAbuserInfo/'
const RISK_FACTOR_INFO_URL = 'http://127.0.0.1:8000/api/DVHRTRiskFactorCounts/'
const OUTCOME_INFO_URL = 'http://127.0.0.1:8000/api/DVHRTCriminalJusticeOutcomes/'

class adminViewSite extends React.Component {
  constructor() {
    super()
    this.state = {
      victim_info: [],
      abuser_info: [],
      risk_factor_info: [],
      outcome_info: [],
      community_list: [],
      community_id: [],
      community_name: []
    }
  }

  componentDidMount() {
    fetch(COMMUNITY_LIST_URL
    ).then(results => {
      return results.json()
    }).then(data => this.setState({ community_list: data }))
  }

  doSetState(tabName, data) {
    if (tabName === 'Victim') {
      this.setState({ victim_info: data })
      console.log(this.state.victim_info)
    } else if (tabName === 'Abuser') {
      this.setState({ abuser_info: data })
    } else if (tabName === 'RiskFactors') {
      this.setState({ risk_factor_info: data })
    } else { /* tabName == 'Outcomes' */
      this.setState({ outcome_info: data })
    }
    console.log('DATA', data)
  }

  getTabInfo(tabName, url) {
    var i, tabcontent, tablinks

    fetch(
      url, {
        headers: {
          communityid: this.state.community_id
        }
      }
    ).then(results => {
      return results.text()
    }).then(text => {
      this.doSetState(tabName, JSON.parse(text))
      console.log('TEXT', text)
    })

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
    // evt.currentTarget.className += ' active';
    console.log('COMMUNITY ID', this.state)
  }

  getCommunity(comId, comName) {
    document.getElementById('community_list').style.display = 'none'
    document.getElementById('tab').style.display = 'block'
    document.getElementById('back_to_com_list').style.display = 'block'
    this.setState({ community_id: comId })
    this.setState({ community_name: comName })
  }

  render() {
    return (
      <div>
        <h1>Viewing a site</h1>
        <div id='community_list'>
          <ul className="community_list">
            {this.state.community_list.map(listitem => (
              <li key={listitem.community_id}>
                <button type='button' onClick={() => this.getCommunity(listitem.community_id, listitem.community_name)}>{listitem.community_name}</button>
              </li>
            ))}
          </ul>
        </div>

        <div id='back_to_com_list'>
          <h2>{this.state.community_name} DVHRT</h2>
          <button type='button' onClick={() => window.location.reload()}> View another community</button>
        </div>
        <div id='tab'>
          <button className='tablinks' onClick={() => this.getTabInfo('Victim', VICTIM_INFO_URL)}>Victim</button>
          <button className='tablinks' onClick={() => this.getTabInfo('Abuser', ABUSER_INFO_URL)}>Abuser</button>
          <button className='tablinks' onClick={() => this.getTabInfo('RiskFactors', RISK_FACTOR_INFO_URL)}>Risk Factors</button>
          <button className='tablinks' onClick={() => this.getTabInfo('Outcomes', OUTCOME_INFO_URL)}>Outcomes</button>
        </div>

        <div id='Victim' className='tabcontent'>
          <h2>DVHRT High Risk Victim Information</h2>
          <Wrapper>
            <ObjectTable Title="Gender" tableRows={[
              ['Female', this.state.victim_info.Female],
              ['Male', this.state.victim_info.Male],
              ['Other', this.state.victim_info.Other],
              ['Total Count', this.state.victim_info['Total Gender Count']]]} />
            <ObjectTable Title="Race/Ethnicity" tableRows={[
              ['American Indian/Alaska Native', this.state.victim_info['American Indian/Alaska Native']],
              ['Asian', this.state.victim_info.Asian],
              ['Black/African American', this.state.victim_info['Black/African American']],
              ['Hispanic or Latino', this.state.victim_info['Hispanic or Latino']],
              ['Native Hawaiian/Pacific Islander', this.state.victim_info['Native Hawaiian/Pacific Islander']],
              ['White', this.state.victim_info.White],
              ['Unknown', this.state.victim_info['Other/Unknown']],
              ['Total', this.state.victim_info['Total Ethnicity Count']]]} />
            <ObjectTable Title="Domestic Violence Service Utilization" tableRows={[
              ['Connection To Domestic Violence Services', this.state.victim_info.connection_to_domestic_violence_services],
              ['Engagement In Ongoing Domestic Violence Services', this.state.victim_info.engagement_in_ongoing_domestic_violence_services]]} />
          </Wrapper>
        </div>

        <div id='Abuser' className='tabcontent'>
          <h2>DVHRT High Risk Abuser Information</h2>
          <p>Gender</p>
          <ObjectTable tableRows={[
            ['Female', this.state.abuser_info.Female],
            ['Male', this.state.abuser_info.Male],
            ['Other', this.state.abuser_info.Other],
            ['Total Count', this.state.abuser_info['Total Gender Count']]]} />
          <p>Race/Ethnicity</p>
          <ObjectTable tableRows={[
            ['American Indian/Alaska Native', this.state.abuser_info['American Indian/Alaska Native']],
            ['Asian', this.state.abuser_info.Asian],
            ['Black/African American', this.state.abuser_info['Black/African American']],
            ['Hispanic or Latino', this.state.abuser_info['Hispanic or Latino']],
            ['Native Hawaiian/Pacific Islander', this.state.abuser_info['Native Hawaiian/Pacific Islander']],
            ['White', this.state.abuser_info.White],
            ['Unknown', this.state.abuser_info['Other/Unknown']],
            ['Total', this.state.abuser_info['Total Ethnicity Count']]]} />
        </div>

        <div id='RiskFactors' className='tabcontent'>
          <h2>Risk Factors Presents In DVHRT Cases</h2>
          <ObjectTable tableRows={[
            ['Has he/she tried to kill you?', this.state.risk_factor_info.attempted_murder],
            ['Has he/she ever tried to choke (strangle) you?', this.state.risk_factor_info.attempted_choke],
            ['Has he/she choked (strangled) you multiple times?', this.state.risk_factor_info.multiple_choked],
            ['Does he/she own a gun?', this.state.risk_factor_info.owns_gun]]} />
        </div>

        <div id='Outcomes' className='tabcontent'>
          <h2>Criminal Justice Outcomes In DVHRT Cases</h2>
          <p>Charges Filed At Or After Case Acceptance</p>
          <ObjectTable tableRows={[
            ['Police Response: Charges Filed', this.state.outcome_info['Police Response: Charges Filed']],
            ['Police Response: No Charges Filed', this.state.outcome_info['Police Response: No Charges Filed']],
            ['No Police Response: Not Applicable', this.state.outcome_info['No Police Response: Not Applicable']]]} />
          <p>Pretrial Hearing Outcome In DVHRT Cases</p>
          <ObjectTable tableRows={[
            ['Released on Bail', this.state.outcome_info['Released on Bail']],
            ['Released on Personal Recognizance', this.state.outcome_info['Released on Personal Recognizance']],
            ['Detained/Pretrial Detention Statute', this.state.outcome_info['Detained/Pretrial Detention Statute']],
            ['Detained/Bail Unmet', this.state.outcome_info['Detained/Bail Unmet']],
            ['Detained/Other', this.state.outcome_info['Detained/Other']],
            ['Pending Pretrial Hearing', this.state.outcome_info['Pending Pretrial Hearing']]]} />
          <p>Disposition Outcomes In DVHRT Cases</p>
          <ObjectTable tableRows={[
            ['Charges Dismissed', this.state.outcome_info['Charges Dismissed']],
            ['Not Guilty', this.state.outcome_info['Not Guilty']],
            ['Deferred Adjudication', this.state.outcome_info['Deferred Adjudication']],
            ['Plead/Found Guilty', this.state.outcome_info['Plead/Found Guilty']],
            ['Pending Disposition', this.state.outcome_info['Pending Disposition']]]} />
          <p>Sentencing Outcomes In DVHRT Cases</p>
          <ObjectTable tableRows={[
            ['Incarceration', this.state.outcome_info.Incarceration],
            ['Probation', this.state.outcome_info.Probation],
            ['Incarceration Followed by Probation', this.state.outcome_info['Incarceration Followed by Probation']]]} />
        </div>

      </div>
    )
  }
}

export default adminViewSite
