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
          <div id='OutcomesForm' className='tabcontent'>
            <DropdownObj id='connection_to_dvs' title='Connection to Domestic Violence Services' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='engagement_in_ongoing_dvs' title='Engagement in Ongoing Domestic Violence Services' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='charges' title='Charges' choices={[['undefined', 0], ['Police Response: Charges Filed', 1], ['Police Response: No Charges Filed', 2], ['No Police Response: Not Applicable', 3]]}/>
            <DropdownObj id='pretrial_outcome' title='Pretrial Outcome' choices={[['undefined', 0], ['Released on Bail', 1], ['Released on Personal Recognizance', 2], ['Detained/Pretrial Detention Statute', 3], ['Detained/Bail Unmet', 4], ['Detained/Other', 5], ['Pending Pretrial Hearing', 6]]}/>
            <DropdownObj id='sentencing_outcomes_disposition' title='Sentencing Outcomes Disposition' choices={[['undefined', 0], ['Charges Dismissed', 1], ['Not Guilty', 2], ['Deferred Adjudication', 3], ['Plead/Found Guilty', 4], ['Pending Disposition', 5]]}/>
            <DropdownObj id='sentencing_outcomes_sentence' title='Sentencing Outcomes Sentence' choices={[['undefined', 0], ['Incarceration', 1], ['Probation', 2], ['Incarceration Followed by Probation', 3]]}/>
          </div>

          <div id='RiskFactorsForm' className='tabcontent'>
            <DropdownObj id='violence_increased' title='Has the physical violence increased in severity or frequency over the past year?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='attempted_leaving' title='Have you left him/her after living together in the past year?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='control_activites' title='Does he/she control most or all of your daily activities?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='attempted_murder' title='Has he/she tried to kill you?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='threatened_murder' title='Has he/she ever threatened to kill you?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='weapon_threat' title='Has he/she used a weapon against you or threatened you with a lethal weapon? ' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='attempted_choke' title='Has he/she ever tried to choke (strangle) you?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='multiple_choked' title='Has he/she choked (strangled) you multiple times?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='killing_capable' title='Do you believe he/she is capable of killing you?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='owns_gun' title='Does he/she own a gun?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='suicide_threat_or_attempt' title='Has he/she ever threatened or tried to commit suicide?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='is_unemployed' title='Is he/she unemployed?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='avoided_arrest' title='Has he/she avoided being arrested for domestic violence?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='unrelated_child' title='Do you have a child that is not his/hers? ' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='uses_illegal_drugs' title='Does he/she use illegal drugs?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='is_alcoholic' title='Is he/she an alcoholic or problem drinker?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='forced_sex' title='Has he/she ever forced you to have sex when you did not wish to do so?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='constantly_jealous' title='Is he/she violently or constantly jealous?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='pregnant_abuse' title='Has he/she ever beaten you while you were pregnant?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='children_threatened' title='Threatens to harm victim’s children?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='has_spied' title='Does he/she spy on you, leaving threatening notes or messages?' choices={[['undefined', 'False'], ['Yes', 'True'], ['No', 'False']]}/>
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
