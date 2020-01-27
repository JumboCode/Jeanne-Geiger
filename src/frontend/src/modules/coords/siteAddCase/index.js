import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import DropdownObj from './util.js'
import SubmitButton from './util.js'

const OUTCOMES_POST_URL = 'http://127.0.0.1:8000/api/outcomes/'

class siteAddCase extends React.Component {
  constructor () {
    super()
    this.state = {
      victim_info: [],
      abuser_info: [],
      risk_factor_info: [],
      outcome_info: [],
    }
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

    // Show the current tab, and add an 'active' class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block'
  }

  doSubmit () {
    var outcome_info = 'connection_to_domestic_violence_services=' + document.getElementById('connection_to_dvs').value 
                 + '&engagement_in_ongoing_domestic_violence_services=' + document.getElementById('engagement_in_ongoing_dvs').value 
                 + '&charges_filed_at_or_after_case_acceptance=' + document.getElementById('charges').value 
                 + '&pretrial_hearing_outcome=' + document.getElementById('pretrial_outcome').value 
                 + '&sentencing_outcomes_disposition=' + document.getElementById('sentencing_outcomes_disposition').value 
                 + '&sentencing_outcomes_sentence=' + document.getElementById('sentencing_outcomes_sentence').value;
    console.log(outcome_info);

    var outcome_post_request = new XMLHttpRequest();
    outcome_post_request.open("POST", OUTCOMES_POST_URL, true);
    outcome_post_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    outcome_post_request.send(outcome_info);
  }

  render () {
    return (
      <div>
        <h1>Adding a Case to a Community</h1>
        <div id='addCaseTab'>
          <button className='tablinks' onClick={() => this.getTabInfo('VictimForm')}>Victim</button>
          <button className='tablinks' onClick={() => this.getTabInfo('AbuserForm')}>Abuser</button>
          <button className='tablinks' onClick={() => this.getTabInfo('RiskFactorsForm')}>Risk Factors</button>
          <button className='tablinks' onClick={() => this.getTabInfo('OutcomesForm')}>Outcomes</button>
        </div>

        <form id='CasePost'>
          <div id='OutcomesForm' className = 'tabcontent'>
            <DropdownObj id='connection_to_dvs' title='Connection to Domestic Violence Services' choices={['undefined', 'Yes', 'No']}/>
            <DropdownObj id='engagement_in_ongoing_dvs' title='Engagement in Ongoing Domestic Violence Services' choices={['undefined', 'Yes', 'No']}/>
            <DropdownObj id='charges' title='Charges' choices={['undefined', 'Police Response: Charges Filed', 'Police Response: No Charges Filed', 'No Police Response: Not Applicable']}/>
            <DropdownObj id='pretrial_outcome' title='Pretrial Outcome' choices={['undefined', 'Released on Bail', 'Released on Personal Recognizance', 'Detained/Pretrial Detention Statute', 'Detained/Bail Unmet', 'Detained/Other', 'Pending Pretrial Hearing']}/>
            <DropdownObj id='sentencing_outcomes_disposition' title='Sentencing Outcomes Disposition' choices={['undefined', 'Charges Dismissed', 'Not Guilty', 'Deferred Adjudication', 'Plead/Found Guilty', 'Pending Disposition']}/>
            <DropdownObj id='sentencing_outcomes_sentence' title='Sentencing Outcomes Sentence' choices={['undefined', 'Incarceration', 'Probation', 'Incarceration Followed by Probation']}/>
          </div>
          <div>
            <button type="submit" onClick={() => this.doSubmit()}  value="Submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default siteAddCase
