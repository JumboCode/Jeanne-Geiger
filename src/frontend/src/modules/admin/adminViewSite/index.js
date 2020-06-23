import React from 'react'
import './styles.css'
import ObjectTable from './table.js'
import styled from 'styled-components'
import { BackButton } from '../../Back/back.js'
import NavigationBar from '../../navbar/NavigationBar.js'
import TabObj from '../../tabs.js'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import Filter from '../../filters/date_filter/filter.js'
import { DOMAIN } from '../../../utils/index.js'
import { Link } from 'react-router-dom'
import Loading from '../../logIn/Loading.js'

const Wrapper = styled.div`
  display: grid;
  margin-left: 7%;
  column-gap : .5%
  grid-template-columns: repeat(3, 210px);
  grid-template-rows: repeat(2, 210px);
  grid-auto-flow: column;
  text-decoration: none;
`

const VICTIM_INFO_URL = DOMAIN + 'api/DVHRTHighRiskVictimInfo/'
const ABUSER_INFO_URL = DOMAIN + 'api/DVHRTHighRiskAbuserInfo/'
const RISK_FACTOR_INFO_URL = DOMAIN + 'api/DVHRTRiskFactorCounts/'
const OUTCOME_INFO_URL = DOMAIN + 'api/DVHRTCriminalJusticeOutcomes/'

class adminViewSite extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      victim_info: [],
      abuser_info: [],
      risk_factor_info: [],
      outcome_info: [],
      community_id: [],
      community_name: [],
      start_date: [],
      end_date: []
    }
  }

  componentDidMount () {
    this.setState({ loading: true })
    var vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
      vars[key] = value
    })

    var path = window.location.pathname
    if (path.slice(1, 5) === 'site') {
      var button = document.getElementById('edit-site-button')
      button.classList.add('hide')
    }

    if (vars.start_date !== undefined && vars.end_date !== undefined) {
      var percentageCols = document.getElementsByClassName('percentage')
      for (var i = 0; i < percentageCols.length; i++) {
        percentageCols[i].style.display = 'block'
      }
    }

    this.setState({ community_name: decodeURIComponent(vars.com_name) }, () => {
      this.setState({ start_date: vars.start_date }, () => {
        this.setState({ end_date: vars.end_date }, () => {
          this.setState({ community_id: vars.com_id }, () => {
            this.fetchTabData(VICTIM_INFO_URL, 'Victim')
            this.fetchTabData(ABUSER_INFO_URL, 'Abuser')
            this.fetchTabData(OUTCOME_INFO_URL, 'Outcomes')
            this.fetchTabData(RISK_FACTOR_INFO_URL, 'RiskFactors')

            this.getTabInfo('Victim')
          })
        })
      })
    })
  }

  fetchTabData (url, tabName) {
    const { cookies } = this.props
    var token = cookies.get('token')
    if (token === '') {
      window.location.reload()
    }
    fetch(
      url, {
        headers: {
          communityid: this.state.community_id,
          startdate: this.state.start_date,
          enddate: this.state.end_date,
          Authorization: `Bearer ${token}`
        }
      }
    ).then(results => {
      if (results.status !== 200) {
        document.getElementById('err').innerHTML = 'An error has occured, please refresh the page or try again later.'
        console.log(results)
      } else {
        this.setState({ loading: false })
        return results.text().then(text => {
          this.doSetState(tabName, JSON.parse(text))
        })
      }
    })
  }

  doSetState (tabName, data) {
    if (tabName === 'Victim') {
      this.setState({ victim_info: data })
    } else if (tabName === 'Abuser') {
      this.setState({ abuser_info: data })
    } else if (tabName === 'RiskFactors') {
      this.setState({ risk_factor_info: data })
    } else { /* tabName == 'Outcomes' */
      this.setState({ outcome_info: data })
    }
  }

  getTabInfo (tabName) {
    if (tabName === 'Risk Factors') tabName = 'RiskFactors'
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

  getBackButtonLink () {
    var path = window.location.pathname
    if (path.slice(1, 5) === 'site') {
      return '/site'
    } else {
      return '/admin'
    }
  }

  render () {
    const loading = this.state.loading
    return (
      <div>
        <NavigationBar />
        <div class="row">
          <div class="col-3">
            <BackButton class="button" link={this.getBackButtonLink()}/>
          </div>
          <div class="col-6">
            <h1 class="header">{this.state.community_name}</h1>
          </div>
          <div class="col-3">
            <span id="edit-site-button">
              <Link to={'/admin/manage-site?com_id=' + this.state.community_id}>
                <button type="button" class="edit_site_button">
                Edit Site
                </button>
              </Link>
            </span>
            <Filter/>
          </div>
        </div>
        <div id='err' ></div>

        <TabObj selectFunc={(index, label) => this.getTabInfo(label)}/>

        <div id='Victim' className='tabcontent'>
          <Wrapper>
            <div className='victim_table'>
              <div className='title'>
                  DVHRT High Risk Victim Information
              </div>
              <ObjectTable Title = "Gender" total={this.state.victim_info['Total Gender Count']} tableRows = {[
                ['Female', this.state.victim_info.Female],
                ['Male', this.state.victim_info.Male],
                ['Other', this.state.victim_info.Other]]}/>
              <div className='total'>
                  Total: {this.state.victim_info['Total Gender Count']}
              </div>
            </div>
            <div className='victim_table'>
              <div className='title'>
                  Victim Race/Ethnicity
              </div>
              <ObjectTable Title = "Race/Ethnicity" total={this.state.victim_info['Total Ethnicity Count']} tableRows = {[
                ['American Indian/Alaska Native', this.state.victim_info['American Indian/Alaska Native']],
                ['Asian', this.state.victim_info.Asian],
                ['Black/African American', this.state.victim_info['Black/African American']],
                ['Hispanic or Latino', this.state.victim_info['Hispanic or Latino']],
                ['Native Hawaiian/Pacific Islander', this.state.victim_info['Native Hawaiian/Pacific Islander']],
                ['White', this.state.victim_info.White],
                ['Unknown', this.state.victim_info['Other/Unknown']]]}/>
              <div className='total'>
                  Total: {this.state.victim_info['Total Ethnicity Count']}
              </div>
            </div>
            <div className='victim_table'>
              <div className='title'>
                  Victim Race/Ethnicity
              </div>
              <ObjectTable Title = "Domestic Violence Service Utilization" total={this.state.victim_info.total}
                tableRows = {[
                  ['Connection To Domestic Violence Services', this.state.victim_info.connection_to_domestic_violence_services],
                  ['Engagement In Ongoing Domestic Violence Services', this.state.victim_info.engagement_in_ongoing_domestic_violence_services]]}/>
              <div className='total'>
                  Total: {this.state.victim_info.total}
              </div>
            </div>
          </Wrapper>
        </div>

        <div id='Abuser' className='tabcontent'>
          <Wrapper>
            <div className='abuser_table'>
              <div className='title'>
                  DVHRT High Risk Victim Information
              </div>
              <ObjectTable Title="Gender" total={this.state.abuser_info['Total Gender Count']} tableRows = {[
                ['Female', this.state.abuser_info.Female],
                ['Male', this.state.abuser_info.Male],
                ['Other', this.state.abuser_info.Other]]}/>
              <div className='total'>
                  Total: {this.state.abuser_info['Total Gender Count']}
              </div>
            </div>

            <div className='abuser_table'>
              <div className='title'>
                  Abuser Race/Ethnicity
              </div>
              <ObjectTable Title="Race/Ethnicity" total={this.state.abuser_info['Total Count']} tableRows = {[
                ['American Indian/Alaska Native', this.state.abuser_info['American Indian/Alaska Native']],
                ['Asian', this.state.abuser_info.Asian],
                ['Black/African American', this.state.abuser_info['Black/African American']],
                ['Hispanic or Latino', this.state.abuser_info['Hispanic or Latino']],
                ['Native Hawaiian/Pacific Islander', this.state.abuser_info['Native Hawaiian/Pacific Islander']],
                ['White', this.state.abuser_info.White],
                ['Unknown', this.state.abuser_info['Other/Unknown']]]}/>
              <div className='total'>
                  Total: {this.state.abuser_info['Total Count']}
              </div>
            </div>
          </Wrapper>
        </div>

        <div id='RiskFactors' className='tabcontent'>
          <Wrapper>
            <div className='abuser_table'>
              <div className='title'>
                  Risk Indicators
              </div>
              <ObjectTable total={this.state.risk_factor_info.total} tableRows = {[
                ['Has he/she tried to kill you?', this.state.risk_factor_info.attempted_murder],
                ['Has he/she ever tried to choke (strangle) you?', this.state.risk_factor_info.attempted_choke],
                ['Has he/she choked (strangled) you multiple times?', this.state.risk_factor_info.multiple_choked],
                ['Does he/she own a gun?', this.state.risk_factor_info.owns_gun]]}/>
              <div className='total'>
                  Total: {this.state.risk_factor_info.total}
              </div>
            </div>
          </Wrapper>
        </div>

        <div id='Outcomes' className='tabcontent'>
          <Wrapper>
            <div className='outcome_table'>
              <div className='title'>
                    Abuser Outcomes
              </div>
              <ObjectTable total={this.state.outcome_info['Total Charges Filed Count']}
                tableRows = {[
                  ['Police Response: Charges Filed', this.state.outcome_info['Police Response: Charges Filed']],
                  ['Police Response: No Charges Filed', this.state.outcome_info['Police Response: No Charges Filed']],
                  ['No Police Response: Not Applicable', this.state.outcome_info['No Police Response: Not Applicable']]]}/>
              <div className='total'>
                    Total: {this.state.outcome_info['Total Charges Filed Count']}
              </div>
            </div>

            <div className='outcome_table'>
              <div className='title'>
                  Bail Hearing Outcomes
              </div>
              <ObjectTable total={this.state.outcome_info['Total Pretrial Hearing Outcomes Count']}
                tableRows = {[
                  ['Released on Bail', this.state.outcome_info['Released on Bail']],
                  ['Released on Personal Recognizance', this.state.outcome_info['Released on Personal Recognizance']],
                  ['Detained/Pretrial Detention Statute', this.state.outcome_info['Detained/Pretrial Detention Statute']],
                  ['Detained/Bail Unmet', this.state.outcome_info['Detained/Bail Unmet']],
                  ['Detained/Other', this.state.outcome_info['Detained/Other']],
                  ['Pending Pretrial Hearing', this.state.outcome_info['Pending Pretrial Hearing']]]}/>
              <div className='total'>
                  Total: {this.state.outcome_info['Total Pretrial Hearing Outcomes Count']}
              </div>
            </div>

            <div className='outcome_table'>
              <div className='title'>
                  Disposition Outcomes
              </div>
              <ObjectTable total={this.state.outcome_info['Total Disposition Outcomes Count']}
                tableRows = {[
                  ['Charges Dismissed', this.state.outcome_info['Charges Dismissed']],
                  ['Not Guilty', this.state.outcome_info['Not Guilty']],
                  ['Deferred Adjudication', this.state.outcome_info['Deferred Adjudication']],
                  ['Plead/Found Guilty', this.state.outcome_info['Plead/Found Guilty']],
                  ['Pending Disposition', this.state.outcome_info['Pending Disposition']]]}/>
              <div className='total'>
                  Total: {this.state.outcome_info['Total Disposition Outcomes Count']}
              </div>
            </div>

            <div className='outcome_table'>
              <div className='title'>
                  Sentencing Outcomes
              </div>
              <ObjectTable total={this.state.outcome_info['Total Sentencing Outcomes Count']}
                tableRows = {[
                  ['Incarceration', this.state.outcome_info.Incarceration],
                  ['Probation', this.state.outcome_info.Probation],
                  ['Incarceration Followed by Probation', this.state.outcome_info['Incarceration Followed by Probation']],
                  ['Total', this.state.outcome_info['Total Sentencing Outcomes Count']]]}/>
              <div className='total'>
                  Total: {this.state.outcome_info['Total Sentencing Outcomes Count']}
              </div>
            </div>
          </Wrapper>
        </div>
        {loading ? <Loading /> : null}
      </div>
    )
  }
}

export default withCookies(adminViewSite)
