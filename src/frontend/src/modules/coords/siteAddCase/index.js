import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import { DateInputObj, DropdownObj, TextInputObj, MultSelectionObj } from './util.js'
import { Tabs, Tab } from 'react-bootstrap-tabs'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
// import { Container } from '@material-ui/core'

const OUTCOMES_POST_URL = 'http://127.0.0.1:8000/api/outcomes/'
const RISK_FACTORS_POST_URL = 'http://127.0.0.1:8000/api/riskfactors/'
const ABUSER_POST_URL = 'http://127.0.0.1:8000/api/abusers/'
const VICTIM_POST_URL = 'http://127.0.0.1:8000/api/victims/'
const CASE_POST_URL = 'http://127.0.0.1:8000/api/cases/'
const COMMUNITY_LIST_URL = 'http://127.0.0.1:8000/api/communities/'
function showTab (index, obj) {
  if (index === 0) obj.getTabInfo('VictimForm')
  else if (index === 1) obj.getTabInfo('AbuserForm')
  else if (index === 2) obj.getTabInfo('RiskFactorsForm')
  else if (index === 3) obj.getTabInfo('OutcomesForm')
}

class siteAddCase extends React.Component {
  constructor () {
    super()
    this.state = {
      referral_sources: []
    }
  }

  componentDidMount () {
    fetch(COMMUNITY_LIST_URL
    ).then(results => {
      return results.json()
    }).then(data => {
      for (var i = 0; i < data.length; i++) {
        if (data[i].community_id === 1) {
          this.setState({ referral_sources: data[i].referral_sources })
        }
      }
    })
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

  doOutcomesPost () {
    return 'connection_to_domestic_violence_services=' + document.getElementById('connection_to_dvs').value +
         '&engagement_in_ongoing_domestic_violence_services=' + document.getElementById('engagement_in_ongoing_dvs').value +
         '&charges_filed_at_or_after_case_acceptance=' + document.getElementById('charges').value +
         '&pretrial_hearing_outcome=' + document.getElementById('pretrial_outcome').value +
         '&sentencing_outcomes_disposition=' + document.getElementById('sentencing_outcomes_disposition').value +
         '&sentencing_outcomes_sentence=' + document.getElementById('sentencing_outcomes_sentence').value
  }

  doRiskFactorsPost () {
    return 'violence_increased=' + document.getElementById('violence_increased').value +
         '&attempted_leaving=' + document.getElementById('attempted_leaving').value +
         '&control_activites=' + document.getElementById('control_activites').value +
         '&attempted_murder=' + document.getElementById('attempted_murder').value +
         '&threatened_murder=' + document.getElementById('threatened_murder').value +
         '&weapon_threat=' + document.getElementById('weapon_threat').value +
         '&attempted_choke=' + document.getElementById('attempted_choke').value +
         '&multiple_choked=' + document.getElementById('multiple_choked').value +
         '&killing_capable=' + document.getElementById('killing_capable').value +
         '&owns_gun=' + document.getElementById('owns_gun').value +
         '&suicide_threat_or_attempt=' + document.getElementById('suicide_threat_or_attempt').value +
         '&is_unemployed=' + document.getElementById('is_unemployed').value +
         '&avoided_arrest=' + document.getElementById('avoided_arrest').value +
         '&unrelated_child=' + document.getElementById('unrelated_child').value +
         '&uses_illegal_drugs=' + document.getElementById('uses_illegal_drugs').value +
         '&is_alcoholic=' + document.getElementById('is_alcoholic').value +
         '&forced_sex=' + document.getElementById('forced_sex').value +
         '&constantly_jealous=' + document.getElementById('constantly_jealous').value +
         '&pregnant_abuse=' + document.getElementById('pregnant_abuse').value +
         '&children_threatened=' + document.getElementById('children_threatened').value +
         '&has_spied=' + document.getElementById('has_spied').value
  }

  doAbuserOrVictimPost (isVictim, name, DOB, gender, raceEthnicity, ageAtCaseAcc, primLang, town) {
    var ethnicities = []
    var selectedOpts = document.getElementById(raceEthnicity).selectedOptions
    for (var i = 0; i < selectedOpts.length; i++) {
      ethnicities.push(parseInt(selectedOpts[i].value))
    }
    console.log(document.getElementById(raceEthnicity).selectedOptions)
    console.log(ethnicities)
    return name + '=' + document.getElementById(name).value +
            '&' + DOB + '=' + document.getElementById(DOB).value +
            '&' + gender + '=' + document.getElementById(gender).value +
            '&' + raceEthnicity + '={' + ethnicities +
            '}&' + ageAtCaseAcc + '=' + document.getElementById(ageAtCaseAcc).value +
            '&' + primLang + '=' + document.getElementById(primLang).value +
            '&' + town + '=' + document.getElementById(town).value
  }

  doSubmit () {
    var oParams = this.doOutcomesPost()
    var aParams = this.doAbuserOrVictimPost(ABUSER_POST_URL, 'False', 'a_name', 'a_dob', 'a_gender', 'a_race_ethnicity', 'a_age_at_case_acceptance', 'a_primary_language', 'a_town')
    var vParams = this.doAbuserOrVictimPost(VICTIM_POST_URL, 'True', 'v_name', 'v_dob', 'v_gender', 'v_race_ethnicity', 'v_age_at_case_acceptance', 'v_primary_language', 'v_town')
    var rfParams = this.doRiskFactorsPost()

    var caseInfo = oParams + '&' + aParams + '&' + vParams + '&' + rfParams + '&' +
                  '&community_id=' + 1 +
                  '&relationship_type=' + document.getElementById('relationship_type').value +
                  '&relationship_len=' + document.getElementById('relationship_len').value +
                  '&minor_in_home=' + document.getElementById('minor_in_home').value +
                  '&referral_source=' + document.getElementById('referral_source').value +
                  '&date_accepted=' + document.getElementById('date_accepted').value

    var casePostRequest = new XMLHttpRequest()
    casePostRequest.open('POST', CASE_POST_URL, true)
    casePostRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    casePostRequest.send(caseInfo)
    casePostRequest.onload = function () {
      return JSON.parse(casePostRequest.responseText).case_id
    }
  }

  showTab (index, obj) {
    if (index === 0) obj.getTabInfo('VictimForm')
    else if (index === 1) obj.getTabInfo('AbuserForm')
    else if (index === 2) obj.getTabInfo('RiskFactorsForm')
    else if (index === 3) obj.getTabInfo('OutcomesForm')
  }

  // function ControlledTabs(){
  //   const [key, setKey] = setState('victim')
  // }
    
  render () {
    return (
      <div>
        <h1>Adding a Case to a Community</h1>


        <Tabs defaultActiveKey= "Victim" onSelect={(index, label) => showTab(index, this)}>
          <Tab label="Victim" >
            <div class="container"> Victim Content
            </div>
          </Tab>
          <Tab label="Abuser" eventKey="Victim">
            <div class="container"> Abuser Content
            </div>
          </Tab>
          <Tab label="Risk Factors" >
            <div class="container"> Risk Factors Content
            </div>
          </Tab>
          <Tab label="Outcomes">
            <div class="container"> Outcomes Content
            </div>
          </Tab>
        </Tabs>

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

          <div id='AbuserForm' className='tabcontent'>
            <div class = "container">
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Group controlId='a_name' id='a_name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId='a_gender' id='a_gender'>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control as="select">
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                        {/* choices={[['Female', 1], ['Male', 2], ['Other', 3]]} */}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId= 'a_dob' id='a_dob'>
                      <Form.Label>Date of birth</Form.Label>
                      <Form.Control placeholder="Enter date of birth" />
                    </Form.Group>

                    <Form.Group controlId='a_age_at_case_acceptance' id='a_age_at_case_acceptance'>
                      <Form.Label>Age at Case Acceptance</Form.Label>
                      <Form.Control as="select">
                        <option>N/A</option>
                        <option>13 or younger</option>
                        <option>14-17</option>
                        <option>18-19</option>
                        <option>20-29</option>
                        <option>30-39</option>
                        <option>40-49</option>
                        <option>50-59</option>
                        <option>60+</option>
                        <option>Unknown</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect2">
                      <Form.Label>Race/ethnicity</Form.Label>
                      {['checkbox'].map(type => (<div key={`default-${type}`} className="mb-3">
                        <Form.Check id={'a_race_ethnicity'} label={'American India/Alaska Native'}/>
                        <Form.Check id={'a_race_ethnicity'} label={'Asian'}/>
                        <Form.Check id={'a_race_ethnicity'} label={'Black/African American'}/>
                        <Form.Check id={'a_race_ethnicity'} label={'Hispanic or Latino'}/>
                        <Form.Check id={'a_race_ethnicity'} label={'Hispanic or Latino'}/>
                        <Form.Check id={'a_race_ethnicity'} label={'Native Hawaiian/Pacific Islander'}/>
                        <Form.Check id={'a_race_ethnicity'} label={'White'}/>
                        <Form.Check id={'a_race_ethnicity'} label={'Other/Unknown'}/>
                      </div>
                      ))}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId='a_primary_language' id='a_primary_language'>
                      <Form.Label>Primary Language</Form.Label>
                      <Form.Control as="select">
                        <option>N/A</option>
                        <option>English</option>
                        <option>Spanish/Spanish Creole</option>
                        <option>Arabic</option>
                        <option>Cambodian/Khmer</option>
                        <option>Chinese</option>
                        <option>French/French Creole</option>
                        <option>German</option>
                        <option>Greek</option>
                        <option>Italian</option>
                        <option>Polish</option>
                        <option>Portuguese/Portuguese Creole</option>
                        <option>Russian</option>
                        <option>Vietnamese</option>
                        <option>Unknown</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='a_town' id='a_town'>
                      <Form.Label>Town</Form.Label>
                      <Form.Control placeholder="Enter town" />
                    </Form.Group>

                  </Col>
                </Form.Row>
              </Form>
            </div>

            <TextInputObj title='Name' id='a_name'/>
            <DateInputObj title='Date of Birth' id='a_dob'/>
            <DropdownObj id='a_gender' title='Gender' choices={[['Female', 1], ['Male', 2], ['Other', 3]]}/>
            <MultSelectionObj id='a_race_ethnicity' title='Race/Ethnicity' size='7' choices={[['American Indian/Alaska Native', 1], ['Asian', 2], ['Black/African American', 3], ['Hispanic or Latino', 4], ['Native Hawaiian/Pacific Islander', 5], ['White', 6], ['Other/Unknown', 7]]}/>
            <DropdownObj id='a_age_at_case_acceptance' title='Age at Case Acceptance' choices={[['13 or younger', 1], ['14-17', 2], ['18-19', 3], ['20-29', 4], ['30-39', 5], ['40-49', 6], ['50-59', 7], ['60+', 8], ['Unknown', 9]]}/>
            <DropdownObj id='a_primary_language' title='Primary Language' choices={[['English', 1], ['Spanish/Spanish Creole', 2], ['Arabic', 3], ['Cambodian/Khmer', 4], ['Chinese', 5], ['French/French Creole', 6], ['German', 7], ['Greek', 8], ['Italian', 9], ['Polish', 10], ['Portugese/Portugese Creole', 11], ['Russian', 12], ['Vietnamese', 13], ['Other/Unknown', 14]]}/>
            <TextInputObj title='Town' id='a_town'/>
          </div>

          <div id='VictimForm' className='tabcontent'>
            <div class = "container">
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Group controlId='v_name' id='v_name'>
                      <Form.Label>Name</Form.Label>
                      <Form.Control placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId='v_gender' id='v_gender'>
                      <Form.Label>Gender</Form.Label>
                      <Form.Control as="select">
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                        {/* choices={[['Female', 1], ['Male', 2], ['Other', 3]]} */}
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId= 'v_dob' id='v_dob'>
                      <Form.Label>Date of birth</Form.Label>
                      <Form.Control placeholder="Enter date of birth" />
                    </Form.Group>

                    <Form.Group controlId='v_age_at_case_acceptance' id='v_age_at_case_acceptance'>
                      <Form.Label>Age at Case Acceptance</Form.Label>
                      <Form.Control as="select">
                        <option>N/A</option>
                        <option>13 or younger</option>
                        <option>14-17</option>
                        <option>18-19</option>
                        <option>20-29</option>
                        <option>30-39</option>
                        <option>40-49</option>
                        <option>50-59</option>
                        <option>60+</option>
                        <option>Unknown</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect2">
                      <Form.Label>Race/ethnicity</Form.Label>
                      {['checkbox'].map(type => (<div key={`default-${type}`} className="mb-3">
                        <Form.Check id={'v_race_ethnicity'} label={'American India/Alaska Native'}/>
                        <Form.Check id={'v_race_ethnicity'} label={'Asian'}/>
                        <Form.Check id={'v_race_ethnicity'} label={'Black/African American'}/>
                        <Form.Check id={'v_race_ethnicity'} label={'Hispanic or Latino'}/>
                        <Form.Check id={'v_race_ethnicity'} label={'Hispanic or Latino'}/>
                        <Form.Check id={'v_race_ethnicity'} label={'Native Hawaiian/Pacific Islander'}/>
                        <Form.Check id={'v_race_ethnicity'} label={'White'}/>
                        <Form.Check id={'v_race_ethnicity'} label={'Other/Unknown'}/>
                      </div>
                      ))}
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId='v_primary_language' id='v_primary_language'>
                      <Form.Label>Primary Language</Form.Label>
                      <Form.Control as="select">
                        <option>N/A</option>
                        <option>English</option>
                        <option>Spanish/Spanish Creole</option>
                        <option>Arabic</option>
                        <option>Cambodian/Khmer</option>
                        <option>Chinese</option>
                        <option>French/French Creole</option>
                        <option>German</option>
                        <option>Greek</option>
                        <option>Italian</option>
                        <option>Polish</option>
                        <option>Portuguese/Portuguese Creole</option>
                        <option>Russian</option>
                        <option>Vietnamese</option>
                        <option>Unknown</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='v_town' id='v_town'>
                      <Form.Label>Town</Form.Label>
                      <Form.Control placeholder="Enter town" />
                    </Form.Group>

                    <Form.Group controlId='relationship_type' id='relationship_type'>
                      <Form.Label>Relationship Type</Form.Label>
                      <Form.Control as="select">
                        <option>N/A</option>
                        <option>Current Spouse/Intimate Partner</option>
                        <option>Former Spouse/Intimate Partner</option>
                        <option>Current Dating Relationship</option>
                        <option>Former Dating Relationship</option>
                        <option>Other</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='relationship_len' id='relationship_len'>
                      <Form.Label>Relationship Length</Form.Label>
                      <Form.Control as="select">
                        <option>N/A</option>
                        <option>less than 1 year</option>
                        <option>1-5 years</option>
                        <option>6-9 years</option>
                        <option>10-14 years</option>
                        <option>15-19 years</option>
                        <option>20-29 years</option>
                        <option>30+ years</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='minor_in_home' id='minor_in_home'>
                      <Form.Label>Minor in Home</Form.Label>
                      <Form.Control as="select">
                        <option>N/A</option>
                        <option>Yes</option>
                        <option>No</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='referral_source' id='referral_source'>
                      <Form.Label>Referral Source</Form.Label>
                      <Form.Control placeholder="Enter referral source" />
                    </Form.Group>

                    <Form.Group controlId='date_accepted' id='date_accepted'>
                      <Form.Label>Date of Case Acceptance</Form.Label>
                      <Form.Control placeholder="Enter date of case acceptance" />
                    </Form.Group>

                  </Col>
                </Form.Row>
              </Form>
            </div>
            <TextInputObj title='Name' id='v_name'/>
            <DateInputObj title='Date of Birth' id='v_dob'/>
            <DropdownObj id='v_gender' title='Gender' choices={[['Female', 1], ['Male', 2], ['Other', 3]]}/>
            <MultSelectionObj id='v_race_ethnicity' title='Race/Ethnicity' size='7' choices={[['American Indian/Alaska Native', 1], ['Asian', 2], ['Black/African American', 3], ['Hispanic or Latino', 4], ['Native Hawaiian/Pacific Islander', 5], ['White', 6], ['Other/Unknown', 7]]}/>
            <DropdownObj id='v_age_at_case_acceptance' title='Age at Case Acceptance' choices={[['13 or younger', 1], ['14-17', 2], ['18-19', 3], ['20-29', 4], ['30-39', 5], ['40-49', 6], ['50-59', 7], ['60+', 8], ['Unknown', 9]]}/>
            <DropdownObj id='v_primary_language' title='Primary Language' choices={[['English', 1], ['Spanish/Spanish Creole', 2], ['Arabic', 3], ['Cambodian/Khmer', 4], ['Chinese', 5], ['French/French Creole', 6], ['German', 7], ['Greek', 8], ['Italian', 9], ['Polish', 10], ['Portugese/Portugese Creole', 11], ['Russian', 12], ['Vietnamese', 13], ['Other/Unknown', 14]]}/>
            <TextInputObj title='Town' id='v_town'/>
            <DropdownObj id='relationship_type' title='Relationship Type' choices={[['Current Spouse/Intimate Partner', 1], ['Former Spouse/Intimate Partner', 2], ['Current Dating Relationship', 3], ['Former Dating Relationship', 4], ['Other', 5]]}/>
            <DropdownObj id='relationship_len' title='Relationship Type' choices={[['<1 year', 1], ['1-5 years', 2], ['6-9 years', 3], ['10-14 years', 4], ['15-19 years', 5], ['20-29 years', 6], ['30+ years', 7]]}/>
            <DropdownObj id='minor_in_home' title='Minor in Home' choices={[['Yes', 'True'], ['No', 'False']]}/>
            <DropdownObj id='referral_source' title='Referral Source' choices={this.state.referral_sources.map(listitem => [listitem, listitem])}/>
            <DateInputObj title='Date of Case Acceptance' id='date_accepted'/>
          </div>

          <div>
            <button type="submit" onClick={() => this.doSubmit()} value="Submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default siteAddCase
