import React from 'react'
import './styles.css'
import { DateInputObj, DropdownObj, TextInputObj, MultSelectionObj, StatusObj } from './util.js'
import NavigationBar from '../../navbar/NavigationBar.js'
import { BackButton } from '../../Back/back.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import TabObj from '../../tabs.js'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import { DOMAIN } from '../../../utils/index.js'
import Loading from '../../logIn/Loading.js'

const CASE_POST_URL = DOMAIN + 'api/cases/'
const REFERRAL_SOURCES_URL = DOMAIN + 'api/OneCommunity/'
const GET_CASE_URL = DOMAIN + 'api/one-case/'

// Title to Value mappings:
const GENDER_TITLE_TO_VALUE = { Female: 1, Male: 2, Other: 3 }
const RACE_ETHNICITY_TITLE_TO_VALUE = { 'American Indian/Alaska Native': 1, Asian: 2, 'Black/African American': 3, 'Hispanic or Latino': 4, 'Native Hawaiian/Pacific Islander': 5, White: 6, 'Other/Unknown': 7 }
const AGE_AT_ACC_TITLE_TO_VALUE = { '13 or younger': 1, '14-17': 2, '18-19': 3, '20-29': 4, '30-39': 5, '40-49': 6, '50-59': 7, '60+': 8, Unknown: 9 }
const PRIMARY_LANGUAGE_TITLE_TO_VALUE = { English: 1, 'Spanish/Spanish Creole': 2, Arabic: 3, 'Cambodian/Khmer': 4, Chinese: 5, 'French/French Creole': 6, German: 7, Greek: 8, Italian: 9, Polish: 10, 'Portugese/Portugese Creole': 11, Russian: 12, Vietnamese: 13, 'Other/Unknown': 14 }
const REL_TYPE_TITLE_TO_VALUE = { 'Current Spouse/Intimate Partner': 1, 'Former Spouse/Intimate Partner': 2, 'Current Dating Relationship': 3, 'Former Dating Relationship': 4, Other: 5 }
const REL_LEN_TITLE_TO_VALUE = { '<1 year': 1, '1-5 years': 2, '6-9 years': 3, '10-14 years': 4, '15-19 years': 5, '20-29 years': 6, '30+ years': 7 }
const BOOL_TITLE_TO_VALUE = { Yes: 'True', No: 'False' }
const CHARGES_TITLE_TO_VALUE = { 'Police Response: Charges Filed': 1, 'Police Response: No Charges Filed': 2, 'No Police Response: Not Applicable': 3 }
const PRETRIAL_OUTCOME_TITLE_TO_VALUE = { 'Released on Bail': 1, 'Released on Personal Recognizance': 2, 'Detained/Pretrial Detention Statute': 3, 'Detained/Bail Unmet': 4, 'Detained/Other': 5, 'Pending Pretrial Hearing': 6 }
const SENT_OUT_DISP_TITLE_TO_VALUE = { 'Charges Dismissed': 1, 'Not Guilty': 2, 'Deferred Adjudication': 3, 'Plead/Found Guilty': 4, 'Pending Disposition': 5 }
const SENT_OUT_SENT_TITLE_TO_VALUE = { Incarceration: 1, Probation: 2, 'Incarceration Followed by Probation': 3 }
const ACTIVE_TITLE_TO_VALUE = { Active: 0, Inactive: 1, Closed: 2 }

class siteAddCase extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor () {
    super()
    this.state = {
      loading: false,
      referral_sources: [],
      is_edit_case_view: false,
      case_id: [],
      community_id: this.getComIdFromUrl()
    }
  }

  getComIdFromUrl () {
    var vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value
    })
    return vars.com_id
  }

  componentDidMount () {
    this.setState({ is_edit_case_view: this.isEditCaseView() })
    this.showTab(0)
    const { cookies } = this.props
    var token = cookies.get('token')
    if (token === '') {
      window.location.reload()
    }

    fetch(REFERRAL_SOURCES_URL, {
      headers: {
        communityid: this.state.community_id,
        Authorization: `Bearer ${token}`
      }
    }).then(results => {
      if (results.status !== 200) {
        document.getElementById('err').innerHTML = 'An error has occured, please refresh the page or try again later.'
        console.log(results)
      } else {
        return results.json()
          .then(data => {
            this.setState({ referral_sources: data.referral_sources })
          })
      }
    })
  }

  // From url, determines if the page is for adding cases or editing them. Returns true, updates
  // this.state.case_id and prepopulates fields if path is for edit. Otherwise, returns false.
  isEditCaseView () {
    var vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value
    })
    if (vars.case_id === undefined) { return false }

    // Update case_id from the url
    this.setState({ case_id: vars.case_id })
    const { cookies } = this.props
    var token = cookies.get('token')
    if (token === '') {
      window.location.reload()
    }

    // Get case specific info, update state and prepopulate fields
    fetch(GET_CASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        caseid: vars.case_id
      }
    })
      .then(results => {
        if (results.status !== 200) {
          document.getElementById('err').innerHTML = 'An error has occured, please refresh the page or try again later.'
          console.log(results)
        } else {
          return results.json()
            .then(data => this.setState({ case: data }))
            .then(() => this.prepopulate())
            .then(document.getElementById('active_status_obj').style.display = 'block')
        }
      })

    return true
  }

  // String needs to be sliced because it ends with a ', ' from the serializer. Multi fields need the selected
  // tag in order to pre-populate. Selected options corresponds to the existing datas
  setSelectedOptions (mutliselectField, selectedOptions) {
    for (var i = 0; i < selectedOptions.length; i++) {
      var value = RACE_ETHNICITY_TITLE_TO_VALUE[selectedOptions[i].slice(0, -2)]
      mutliselectField.options[value - 1].selected = true
    }
  }

  prepopulate () {
    // victim prepopulate
    document.getElementById('v_name').value = this.state.case.victim_id.name
    document.getElementById('v_dob').value = this.state.case.victim_id.dob
    document.getElementById('v_gender').value = GENDER_TITLE_TO_VALUE[this.state.case.victim_id.gender]
    this.setSelectedOptions(document.getElementById('v_race_ethnicity'), this.state.case.victim_id.race_ethnicity)
    document.getElementById('v_age_at_case_acceptance').value = AGE_AT_ACC_TITLE_TO_VALUE[this.state.case.victim_id.age_at_case_acceptance]
    document.getElementById('v_primary_language').value = PRIMARY_LANGUAGE_TITLE_TO_VALUE[this.state.case.victim_id.primary_language]
    document.getElementById('v_town').value = this.state.case.victim_id.town
    document.getElementById('relationship_type').value = REL_TYPE_TITLE_TO_VALUE[this.state.case.relationship_type]
    document.getElementById('relationship_len').value = REL_LEN_TITLE_TO_VALUE[this.state.case.relationship_len]
    document.getElementById('minor_in_home').value = BOOL_TITLE_TO_VALUE[this.state.case.minor_in_home]
    document.getElementById('referral_source').value = this.state.case.referral_source
    document.getElementById('date_accepted').value = this.state.case.date_accepted
    document.getElementById('active_status').value = ACTIVE_TITLE_TO_VALUE[this.state.case.active_status]

    // abuser prepopulate
    document.getElementById('a_name').value = this.state.case.abuser_id.name
    document.getElementById('a_dob').value = this.state.case.abuser_id.dob
    document.getElementById('a_gender').value = GENDER_TITLE_TO_VALUE[this.state.case.abuser_id.gender]
    this.setSelectedOptions(document.getElementById('a_race_ethnicity'), this.state.case.abuser_id.race_ethnicity)
    document.getElementById('a_age_at_case_acceptance').value = AGE_AT_ACC_TITLE_TO_VALUE[this.state.case.abuser_id.age_at_case_acceptance]
    document.getElementById('a_primary_language').value = PRIMARY_LANGUAGE_TITLE_TO_VALUE[this.state.case.abuser_id.primary_language]
    document.getElementById('a_town').value = this.state.case.abuser_id.town

    // riskfactor prepopulate
    document.getElementById('violence_increased').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.violence_increased]
    document.getElementById('attempted_leaving').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.attempted_leaving]
    document.getElementById('control_activites').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.control_activites]
    document.getElementById('attempted_murder').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.attempted_murder]
    document.getElementById('threatened_murder').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.threatened_murder]
    document.getElementById('weapon_threat').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.weapon_threat]
    document.getElementById('attempted_choke').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.attempted_choke]
    document.getElementById('multiple_choked').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.multiple_choked]
    document.getElementById('killing_capable').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.killing_capable]
    document.getElementById('owns_gun').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.owns_gun]
    document.getElementById('suicide_threat_or_attempt').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.suicide_threat_or_attempt]
    document.getElementById('is_unemployed').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.is_unemployed]
    document.getElementById('avoided_arrest').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.avoided_arrest]
    document.getElementById('unrelated_child').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.unrelated_child]
    document.getElementById('uses_illegal_drugs').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.uses_illegal_drugs]
    document.getElementById('is_alcoholic').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.is_alcoholic]
    document.getElementById('forced_sex').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.forced_sex]
    document.getElementById('constantly_jealous').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.constantly_jealous]
    document.getElementById('pregnant_abuse').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.pregnant_abuse]
    document.getElementById('children_threatened').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.children_threatened]
    document.getElementById('has_spied').value = BOOL_TITLE_TO_VALUE[this.state.case.risk_factor_id.has_spied]

    // outcome prepopulate
    document.getElementById('connection_to_dvs').value = BOOL_TITLE_TO_VALUE[this.state.case.outcome_id.connection_to_domestic_violence_services]
    document.getElementById('engagement_in_ongoing_dvs').value = BOOL_TITLE_TO_VALUE[this.state.case.outcome_id.engagement_in_ongoing_domestic_violence_services]
    document.getElementById('charges').value = CHARGES_TITLE_TO_VALUE[this.state.case.outcome_id.charges_filed_at_or_after_case_acceptance]
    document.getElementById('pretrial_outcome').value = PRETRIAL_OUTCOME_TITLE_TO_VALUE[this.state.case.outcome_id.pretrial_hearing_outcome]
    document.getElementById('sentencing_outcomes_disposition').value = SENT_OUT_DISP_TITLE_TO_VALUE[this.state.case.outcome_id.sentencing_outcomes_disposition]
    document.getElementById('sentencing_outcomes_sentence').value = SENT_OUT_SENT_TITLE_TO_VALUE[this.state.case.outcome_id.sentencing_outcomes_sentence]
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
    return name + '=' + document.getElementById(name).value +
            '&' + DOB + '=' + document.getElementById(DOB).value +
            '&' + gender + '=' + document.getElementById(gender).value +
            '&' + raceEthnicity + '={' + ethnicities +
            '}&' + ageAtCaseAcc + '=' + document.getElementById(ageAtCaseAcc).value +
            '&' + primLang + '=' + document.getElementById(primLang).value +
            '&' + town + '=' + document.getElementById(town).value
  }

  doSubmit () {
    var f = document.getElementsByTagName('form')[0]
    if (!f.checkValidity()) {
      alert('Please fill out all fields.')
      return
    }
    this.setState({ loading: true })
    var activeStatus = 0
    var oParams = this.doOutcomesPost()
    var aParams = this.doAbuserOrVictimPost('False', 'a_name', 'a_dob', 'a_gender', 'a_race_ethnicity', 'a_age_at_case_acceptance', 'a_primary_language', 'a_town')
    var vParams = this.doAbuserOrVictimPost('True', 'v_name', 'v_dob', 'v_gender', 'v_race_ethnicity', 'v_age_at_case_acceptance', 'v_primary_language', 'v_town')
    var rfParams = this.doRiskFactorsPost()

    var caseInfo = oParams + '&' + aParams + '&' + vParams + '&' + rfParams + '&' +
                  '&community_id=' + this.state.community_id +
                  '&relationship_type=' + document.getElementById('relationship_type').value +
                  '&relationship_len=' + document.getElementById('relationship_len').value +
                  '&minor_in_home=' + document.getElementById('minor_in_home').value +
                  '&referral_source=' + document.getElementById('referral_source').value +
                  '&date_accepted=' + document.getElementById('date_accepted').value

    if (this.state.is_edit_case_view) {
      caseInfo = 'case_id=' + this.state.case_id + '&' + caseInfo
      activeStatus = document.getElementById('active_status').value
    }

    caseInfo += '&active_status=' + activeStatus
    const { cookies } = this.props
    var token = cookies.get('token')
    if (token === '') {
      window.location.reload()
    }
    var casePostRequest = new XMLHttpRequest()
    casePostRequest.open('POST', CASE_POST_URL, true)
    casePostRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    casePostRequest.setRequestHeader('Authorization', `Bearer ${token}`)
    casePostRequest.onload = function () { window.location.href = '/site/case-view?case_id=' + JSON.parse(casePostRequest.responseText).case_id }
    casePostRequest.send(caseInfo)
  }

  showTab (index) {
    if (index === 0) { this.getTabInfo('VictimForm') } else if (index === 1) { this.getTabInfo('AbuserForm') } else if (index === 2) { this.getTabInfo('RiskFactorsForm') } else if (index === 3) { this.getTabInfo('OutcomesForm') }
  }

  render () {
    const loading = this.state.loading
    return (
      <div>
        <NavigationBar />
        <BackButton link='/site'/>
        <div id='err'></div>
        <div class = "container">
          <TabObj selectFunc={(index, label) => this.showTab(index)}/>
          <form id='CasePost'>
            <div id='OutcomesForm' className='tabcontent'>
              <div class = "container">
                <Form.Row>
                  <Col>
                    <DropdownObj id='connection_to_dvs' title='Connection to Domestic Violence Services' choices={[['Yes', 'True'], ['No', 'False']]}/>
                    <DropdownObj id='engagement_in_ongoing_dvs' title='Engagement in Ongoing Domestic Violence Services' choices={[['Yes', 'True'], ['No', 'False']]}/>
                    <DropdownObj id='charges' title='Charges' choices={[['Police Response: Charges Filed', 1], ['Police Response: No Charges Filed', 2], ['No Police Response: Not Applicable', 3]]}/>
                  </Col>
                  <Col>
                    <DropdownObj id='pretrial_outcome' title='Pretrial Outcome' choices={[['Released on Bail', 1], ['Released on Personal Recognizance', 2], ['Detained/Pretrial Detention Statute', 3], ['Detained/Bail Unmet', 4], ['Detained/Other', 5], ['Pending Pretrial Hearing', 6]]}/>
                    <DropdownObj id='sentencing_outcomes_disposition' title='Sentencing Outcomes Disposition' choices={[['Charges Dismissed', 1], ['Not Guilty', 2], ['Deferred Adjudication', 3], ['Plead/Found Guilty', 4], ['Pending Disposition', 5]]}/>
                    <DropdownObj id='sentencing_outcomes_sentence' title='Sentencing Outcomes Sentence' choices={[['Incarceration', 1], ['Probation', 2], ['Incarceration Followed by Probation', 3]]}/>
                  </Col>
                </Form.Row>
              </div>
            </div>

            <div id ='RiskFactorsForm' className = 'tabcontent'>
              <div class = "container">
                <Form.Row>
                  <Col>
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
                  </Col>
                  <Col>
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
                  </Col>
                </Form.Row>
              </div>
            </div>

            <div id='AbuserForm' className='tabcontent'>
              <div class = "container">
                <Form.Row>
                  <Col>
                    <TextInputObj title='Name' id='a_name'/>
                    <DateInputObj title='Date of Birth' id='a_dob'/>
                    <DropdownObj id='a_gender' title='Gender' choices={[['Female', 1], ['Male', 2], ['Other', 3]]}/>
                    <MultSelectionObj id='a_race_ethnicity' title='Race/Ethnicity' size='7' choices={[['American Indian/Alaska Native', 1], ['Asian', 2], ['Black/African American', 3], ['Hispanic or Latino', 4], ['Native Hawaiian/Pacific Islander', 5], ['White', 6], ['Other/Unknown', 7]]}/>
                  </Col>
                  <Col>
                    <DropdownObj id='a_age_at_case_acceptance' title='Age at Case Acceptance' choices={[['13 or younger', 1], ['14-17', 2], ['18-19', 3], ['20-29', 4], ['30-39', 5], ['40-49', 6], ['50-59', 7], ['60+', 8], ['Unknown', 9]]}/>
                    <DropdownObj id='a_primary_language' title='Primary Language' choices={[['English', 1], ['Spanish/Spanish Creole', 2], ['Arabic', 3], ['Cambodian/Khmer', 4], ['Chinese', 5], ['French/French Creole', 6], ['German', 7], ['Greek', 8], ['Italian', 9], ['Polish', 10], ['Portugese/Portugese Creole', 11], ['Russian', 12], ['Vietnamese', 13], ['Other/Unknown', 14]]}/>
                    <TextInputObj title='Town' id='a_town'/>
                  </Col>
                </Form.Row>
              </div>
            </div>

            <div id='VictimForm' className='tabcontent'>
              <div class = "container">
                <Form.Row>
                  <Col>
                    <TextInputObj title='Name' id='v_name'/>
                    <DateInputObj title='Date of Birth' id='v_dob'/>
                    <DropdownObj id='v_gender' title='Gender' choices={[['Female', 1], ['Male', 2], ['Other', 3]]}/>
                    <MultSelectionObj id='v_race_ethnicity' title='Race/Ethnicity' size='7' choices={[['American Indian/Alaska Native', 1], ['Asian', 2], ['Black/African American', 3], ['Hispanic or Latino', 4], ['Native Hawaiian/Pacific Islander', 5], ['White', 6], ['Other/Unknown', 7]]}/>
                    <DropdownObj id='v_age_at_case_acceptance' title='Age at Case Acceptance' choices={[['13 or younger', 1], ['14-17', 2], ['18-19', 3], ['20-29', 4], ['30-39', 5], ['40-49', 6], ['50-59', 7], ['60+', 8], ['Unknown', 9]]}/>
                    <DropdownObj id='v_primary_language' title='Primary Language' choices={[['English', 1], ['Spanish/Spanish Creole', 2], ['Arabic', 3], ['Cambodian/Khmer', 4], ['Chinese', 5], ['French/French Creole', 6], ['German', 7], ['Greek', 8], ['Italian', 9], ['Polish', 10], ['Portugese/Portugese Creole', 11], ['Russian', 12], ['Vietnamese', 13], ['Other/Unknown', 14]]}/>
                  </Col>
                  <Col>
                    <TextInputObj title='Town' id='v_town'/>
                    <DropdownObj id='relationship_type' title='Relationship Type' choices={[['Current Spouse/Intimate Partner', 1], ['Former Spouse/Intimate Partner', 2], ['Current Dating Relationship', 3], ['Former Dating Relationship', 4], ['Other', 5]]}/>
                    <DropdownObj id='relationship_len' title='Relationship Type' choices={[['<1 year', 1], ['1-5 years', 2], ['6-9 years', 3], ['10-14 years', 4], ['15-19 years', 5], ['20-29 years', 6], ['30+ years', 7]]}/>
                    <DropdownObj id='minor_in_home' title='Minor in Home' choices={[['Yes', 'True'], ['No', 'False']]}/>
                    <DropdownObj id='referral_source' title='Referral Source' choices={this.state.referral_sources.map(listitem => [listitem, listitem])}/>
                    <DateInputObj title='Date of Case Acceptance' id='date_accepted'/>
                    <StatusObj/>
                  </Col>
                </Form.Row>
              </div>
            </div>
          </form>

          <div>
            <button onClick={() => this.doSubmit()} >Submit</button>
          </div>
          <div class="loading">
            {loading ? (<Loading />) : null}
          </div>
        </div>
      </div>

    )
  }
}

export default withCookies(siteAddCase)
