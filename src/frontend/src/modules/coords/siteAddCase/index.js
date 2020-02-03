import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import DropdownObj from './util.js'
import SubmitButton from './util.js'

const OUTCOMES_POST_URL = 'http://127.0.0.1:8000/api/outcomes/'
const RISK_FACTORS_POST_URL = 'http://127.0.0.1:8000/api/riskfactors/'
const ABUSER_POST_URL = 'http://127.0.0.1:8000/api/abusers/'

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

  doOutcomesPost() {
    var outcome_info = 'connection_to_domestic_violence_services=' + document.getElementById('connection_to_dvs').value 
                 + '&engagement_in_ongoing_domestic_violence_services=' + document.getElementById('engagement_in_ongoing_dvs').value 
                 + '&charges_filed_at_or_after_case_acceptance=' + document.getElementById('charges').value 
                 + '&pretrial_hearing_outcome=' + document.getElementById('pretrial_outcome').value 
                 + '&sentencing_outcomes_disposition=' + document.getElementById('sentencing_outcomes_disposition').value 
                 + '&sentencing_outcomes_sentence=' + document.getElementById('sentencing_outcomes_sentence').value;

    var outcome_post_request = new XMLHttpRequest();
    outcome_post_request.open("POST", OUTCOMES_POST_URL, true);
    outcome_post_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var outcome_id = outcome_post_request.send(outcome_info)['outcome_id'];
  }

  doRiskFactorsPost() {
    var risk_factor_info = 'violence_increased=' + document.getElementById('violence_increased').value
                         + '&attempted_leaving=' + document.getElementById('attempted_leaving').value
                         + '&control_activites=' + document.getElementById('control_activites').value
                         + '&attempted_murder=' + document.getElementById('attempted_murder').value
                         + '&threatened_murder=' + document.getElementById('threatened_murder').value
                         + '&weapon_threat=' + document.getElementById('weapon_threat').value
                         + '&attempted_choke=' + document.getElementById('attempted_choke').value
                         + '&multiple_choked=' + document.getElementById('multiple_choked').value
                         + '&killing_capable=' + document.getElementById('killing_capable').value
                         + '&owns_gun=' + document.getElementById('owns_gun').value
                         + '&suicide_threat_or_attempt=' + document.getElementById('suicide_threat_or_attempt').value
                         + '&is_unemployed=' + document.getElementById('is_unemployed').value
                         + '&avoided_arrest=' + document.getElementById('avoided_arrest').value
                         + '&unrelated_child=' + document.getElementById('unrelated_child').value
                         + '&uses_illegal_drugs=' + document.getElementById('uses_illegal_drugs').value
                         + '&is_alcoholic=' + document.getElementById('is_alcoholic').value
                         + '&forced_sex=' + document.getElementById('forced_sex').value
                         + '&constantly_jealous=' + document.getElementById('constantly_jealous').value
                         + '&pregnant_abuse=' + document.getElementById('pregnant_abuse').value
                         + '&children_threatened=' + document.getElementById('children_threatened').value
                         + '&has_spied=' + document.getElementById('has_spied').value;

    var rf_post_request = new XMLHttpRequest();
    rf_post_request.open("POST", RISK_FACTORS_POST_URL, true);
    rf_post_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    rf_post_request.send(risk_factor_info);
  }

  doAbuserPost() {
    var ethnicities = []
    var selected_opts = document.getElementById('a_race_ethnicity').selectedOptions
    for (var i = 0; i < selected_opts.length; i++){
      console.log(selected_opts[i].value)
      ethnicities.push(parseInt(selected_opts[i].value))
    }
    console.log(document.getElementById('a_race_ethnicity').selectedOptions)
    console.log(ethnicities)
    var abuser_info = 'is_victim=' + 'False' 
                    + '&name=' + document.getElementById('a_name').value 
                    + '&dob='+ document.getElementById('a_dob').value 
                    + '&gender=' + document.getElementById('a_gender').value
                    + '&race_ethnicity={' + ethnicities
                    + '}&age_at_case_acceptance=' + document.getElementById('a_age_at_case_acceptance').value
                    + '&primary_language=' + document.getElementById('a_primary_language').value
                    + '&town=' + document.getElementById('a_town').value;

    console.log(abuser_info)

    var abuser_post_request = new XMLHttpRequest();
    abuser_post_request.open("POST", ABUSER_POST_URL, true);
    abuser_post_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    abuser_post_request.send(abuser_info);
  }

  doSubmit () {
    this.doOutcomesPost()
    //this.doRiskFactorsPost()
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
            <DropdownObj id='connection_to_dvs' title='Connection to Domestic Violence Services' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='engagement_in_ongoing_dvs' title='Engagement in Ongoing Domestic Violence Services' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='charges' title='Charges' choices={[['Police Response: Charges Filed', 1], ['Police Response: No Charges Filed', 2], ['No Police Response: Not Applicable', 3]]}/>
            <DropdownObj id='pretrial_outcome' title='Pretrial Outcome' choices={[['Released on Bail', 1], ['Released on Personal Recognizance', 2], ['Detained/Pretrial Detention Statute', 3], ['Detained/Bail Unmet', 4], ['Detained/Other', 5], ['Pending Pretrial Hearing', 6]]}/>
            <DropdownObj id='sentencing_outcomes_disposition' title='Sentencing Outcomes Disposition' choices={[['Charges Dismissed', 1], ['Not Guilty', 2], ['Deferred Adjudication', 3], ['Plead/Found Guilty', 4], ['Pending Disposition', 5]]}/>
            <DropdownObj id='sentencing_outcomes_sentence' title='Sentencing Outcomes Sentence' choices={[['Incarceration', 1], ['Probation', 2], ['Incarceration Followed by Probation', 3]]}/>
          </div>

          <div id='RiskFactorsForm' className='tabcontent'>
            <DropdownObj id='violence_increased' title='Has the physical violence increased in severity or frequency over the past year?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='attempted_leaving' title='Have you left him/her after living together in the past year?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='control_activites' title='Does he/she control most or all of your daily activities?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='attempted_murder' title='Has he/she tried to kill you?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='threatened_murder' title='Has he/she ever threatened to kill you?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='weapon_threat' title='Has he/she used a weapon against you or threatened you with a lethal weapon? ' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='attempted_choke' title='Has he/she ever tried to choke (strangle) you?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='multiple_choked' title='Has he/she choked (strangled) you multiple times?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='killing_capable' title='Do you believe he/she is capable of killing you?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='owns_gun' title='Does he/she own a gun?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='suicide_threat_or_attempt' title='Has he/she ever threatened or tried to commit suicide?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='is_unemployed' title='Is he/she unemployed?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='avoided_arrest' title='Has he/she avoided being arrested for domestic violence?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='unrelated_child' title='Do you have a child that is not his/hers? ' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='uses_illegal_drugs' title='Does he/she use illegal drugs?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='is_alcoholic' title='Is he/she an alcoholic or problem drinker?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='forced_sex' title='Has he/she ever forced you to have sex when you did not wish to do so?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='constantly_jealous' title='Is he/she violently or constantly jealous?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='pregnant_abuse' title='Has he/she ever beaten you while you were pregnant?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='children_threatened' title='Threatens to harm victim’s children?' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='has_spied' title='Does he/she spy on you, leaving threatening notes or messages?' choices={[['Yes', 'True'], ['No', 'False']]}/>
          </div>

          <div>
            <button type="submit" onClick={() => this.doSubmit()}  value="Submit">Submit</button>
          </div>
        </form>
          <div id='AbuserForm' className='tabcontent'>
            Name: <input type='text' id='a_name' name='a_name'></input>
            Date of Birth: <input type="date" id="a_dob" name="a_dob" min="1900-01-01"></input>
            <DropdownObj id='a_gender' title='Gender' choices={[['Female', 1], ['Male', 2], ['Other', 3]]}/>
            <select id="a_race_ethnicity" size="7" multiple="multiple">
              <option value='1'>American Indian/Alaska Native</option>
              <option value='2'>Asian</option>
              <option value='3'>Black/African American</option>
              <option value='4'>Hispanic or Latino</option>
              <option value='5'>Native Hawaiian/Pacific Islander</option>
              <option value='6'>White</option>
              <option value='7'>Other/Unknown</option>
            </select>
            <DropdownObj id='a_age_at_case_acceptance' title='Age at Case Acceptance' choices={[['13 or younger', 1], ['14-17', 2], ['18-19', 3], ['20-29', 4], ['30-39', 5], ['40-49', 6], ['50-59', 7], ['60+', 8], ['Unknown', 9]]}/>
            <DropdownObj id='a_primary_language' title='Primary Language' choices={[['English', 1], ['Spanish/Spanish Creole', 2], ['Arabic', 3], ['Cambodian/Khmer', 4], ['Chinese', 5], ['French/French Creole', 6], ['German', 7], ['Greek', 8], ['Italian', 9], ['Polish', 10], ['Portugese/Portugese Creole', 11], ['Russian', 12], ['Vietnamese', 13], ['Other/Unknown', 14]]}/>
            Town: <input type='text' id='a_town' name='a_town'></input>

          </div>
          <div>
            <button type="submit" onClick={() => this.doAbuserPost()}  value="Submit">Abuser Submit</button>
          </div>
      </div>
    )
  }
}

export default siteAddCase
