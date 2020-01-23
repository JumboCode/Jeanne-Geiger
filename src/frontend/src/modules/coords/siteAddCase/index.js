import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'

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

  render () {
    return (
      <div>
        <h1>Adding a Case to a Community</h1>
        <div id='addCaseTab'>
          <button className='tablinks' onClick={() => this.getTabInfo('VictimForm')}>Victim</button>
          <button className='tablinks' onClick={() => this.getTabInfo('AbuserForm')}>Abuser</button>
          <button className='tablinks' onClick={() => this.getTabInfo('RiskFactorsForm')}>Risk Factors</button>
          <button className='tablinks' onClick={() => this.getTabInfo('OutcomesForm')}>Outcomes</button>
          <button className='tablinks' onClick={() => this.getTabInfo('OtherForm')}>Other</button>
        </div>

        <div id='OutcomesForm' className = 'tabcontent'>
          <p>Connection to Domestic Violence Services: 
            <select name='connection_to_domestic_violence_services'>
              <option value='undefined'>Undefined</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
          </p>
          <p>Engagement in Ongoing Domestic Violence Services:
            <select name='engagement_in_ongoing_domestic_violence_services'>
              <option value='undefined'>Undefined</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
          </p>
          <p>Charges:
            <select name='Charges'>
              <option value='undefined'>Undefined</option>
              <option value='Police Response: Charges Filed'>Police Response: Charges Filed</option>
              <option value='Police Response: No Charges Filed'>Police Response: No Charges Filed</option>
              <option value='No Police Response: Not Applicable'>No Police Response: Not Applicable</option>
            </select>
          </p>
          <p>Pretrial Outcome:
            <select name='PretrialOutcome'>
              <option value='undefined'>Undefined</option>
              <option value='Released on Bail'>Released on Bail</option>
              <option value='Released on Personal Recognizance'>Released on Personal Recognizance</option>
              <option value='Detained/Pretrial Detention Statute'>Detained/Pretrial Detention Statute</option>
              <option value='Detained/Bail Unmet'>Detained/Bail Unmet</option>
              <option value='Detained/Other'>Detained/Other</option>
              <option value='Pending Pretrial Hearing'>Pending Pretrial Hearing</option>
            </select>
          </p>
          <p>Sentencing Outcomes Disposition:
            <select name='SentencingOutcomesDisposition'>
              <option value='undefined'>Undefined</option>
              <option value='Charges Dismissed'>Charges Dismissed</option>
              <option value='Not Guilty'>Not Guilty</option>
              <option value='Deferred Adjudication'>Deferred Adjudication</option>
              <option value='Plead/Found Guilty'>Plead/Found Guilty</option>
              <option value='Pending Disposition'>Pending Disposition</option>
            </select>
          </p>
          <p>Sentencing Outcomes Sentence:
            <select name='SentencingOutcomesSentence'>
              <option value='undefined'>Undefined</option>
              <option value='Incarceration'>Incarceration</option>
              <option value='Probation'>Probation</option>
              <option value='Incarceration Followed by Probation'>Incarceration Followed by Probation</option>
            </select>
          </p>
        </div>
      </div>
    )
  }
}

export default siteAddCase
