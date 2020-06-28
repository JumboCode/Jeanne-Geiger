import React from 'react'
import './styles.css'
import NavigationBar from '../../navbar/NavigationBar.js'
import TabObj from '../../tabs.js'
import OverviewTable from '../../overviewTable/overviewTable.js'
import Loading from '../../logIn/Loading.js'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import { DOMAIN } from '../../../utils/index.js'

const CASES_URL = DOMAIN + 'api/CasesByCommunity/'

class siteOverview extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor () {
    super()
    this.state = {
      loading: true,
      community_id: null,
      community_name: '',
      cases: [],
      page: 1,
      victim_columns: [
        {
          Header: 'Date Created',
          accessor: 'date_accepted'
        },
        {
          Header: 'Status',
          accessor: 'active_status'
        },
        {
          Header: 'Name',
          accessor: 'victim_id.name'
        },
        {
          Header: 'DOB',
          accessor: 'victim_id.dob'
        },
        {
          Header: 'Gender',
          accessor: 'victim_id.gender'
        },
        {
          Header: 'Race/Ethnicity',
          accessor: 'victim_id.race_ethnicity'
        },
        {
          Header: 'Age at Case Acceptance',
          accessor: 'victim_id.age_at_case_acceptance'
        },
        {
          Header: 'Primary Language',
          accessor: 'victim_id.primary_language'
        },
        {
          Header: 'Town',
          accessor: 'victim_id.town'
        },
        {
          Header: 'Relationship Type',
          accessor: 'relationship_type'
        },
        {
          Header: 'Relationship Length',
          accessor: 'relationship_len'
        },
        {
          Header: 'Minor in Home',
          accessor: 'minor_in_home'
        },
        {
          Header: 'Referral Source',
          accessor: 'referral_source'
        }
      ],
      abuser_columns: [
        {
          Header: 'Date Created',
          accessor: 'date_accepted'
        },
        {
          Header: 'Status',
          accessor: 'active_status'
        },
        {
          Header: 'Name',
          accessor: 'abuser_id.name'
        },
        {
          Header: 'DOB',
          accessor: 'abuser_id.dob'
        },
        {
          Header: 'Gender',
          accessor: 'abuser_id.gender'
        },
        {
          Header: 'Race/Ethnicity',
          accessor: 'abuser_id.race_ethnicity'
        },
        {
          Header: 'Age at Case Acceptance',
          accessor: 'abuser_id.age_at_case_acceptance'
        },
        {
          Header: 'Primary Language',
          accessor: 'abuser_id.primary_language'
        },
        {
          Header: 'Town',
          accessor: 'abuser_id.town'
        }
      ],
      risk_factor_columns: [
        {
          Header: 'Date Created',
          accessor: 'date_accepted'
        },
        {
          Header: 'Victim Name',
          accessor: 'victim_id.name'
        },
        {
          Header: 'Abuser Name',
          accessor: 'abuser_id.name'
        },
        {
          Header:
            'Increased Violence',
          accessor: 'risk_factor_id.violence_increased'
        },
        {
          Header:
            'Recent Separation',
          accessor: 'risk_factor_id.attempted_leaving'
        },
        {
          Header: 'Controls Daily Activities',
          accessor: 'risk_factor_id.control_activites'
        },
        {
          Header: 'Tried to kill',
          accessor: 'risk_factor_id.attempted_murder'
        },
        {
          Header: 'Threats to kill',
          accessor: 'risk_factor_id.threatened_murder'
        },
        {
          Header:
            'Weapon Use/Threats',
          accessor: 'risk_factor_id.weapon_threat'
        },
        {
          Header: 'Strangulation',
          accessor: 'risk_factor_id.attempted_choke'
        },
        {
          Header: 'Multiple Strangulations',
          accessor: 'risk_factor_id.multiple_choked'
        },
        {
          Header: 'Capable of Killing',
          accessor: 'risk_factor_id.killing_capable'
        },
        {
          Header: 'Gun Ownership',
          accessor: 'risk_factor_id.owns_gun'
        },
        {
          Header: 'Threats/Attempts Suicide',
          accessor: 'risk_factor_id.suicide_threat_or_attempt'
        },
        {
          Header: 'Unemployed',
          accessor: 'risk_factor_id.is_unemployed'
        },
        {
          Header: 'Avoided Arrest',
          accessor: 'risk_factor_id.avoided_arrest'
        },
        {
          Header: 'Child not theirs',
          accessor: 'risk_factor_id.unrelated_child'
        },
        {
          Header: 'Illegal Drug Use',
          accessor: 'risk_factor_id.uses_illegal_drugs'
        },
        {
          Header: 'Alcoholic',
          accessor: 'risk_factor_id.is_alcoholic'
        },
        {
          Header:
            'Forced Sex',
          accessor: 'risk_factor_id.forced_sex'
        },
        {
          Header: 'Jealousy',
          accessor: 'risk_factor_id.constantly_jealous'
        },
        {
          Header: 'Beaten while Pregnant',
          accessor: 'risk_factor_id.pregnant_abuse'
        },
        {
          Header: 'Threats to Small Children',
          accessor: 'risk_factor_id.children_threatened'
        },
        {
          Header:
            'Stalking Behavior',
          accessor: 'risk_factor_id.has_spied'
        }
      ],
      outcomes_columns: [
        {
          Header: 'Date Created',
          accessor: 'date_accepted'
        },
        {
          Header: 'Victim Name',
          accessor: 'victim_id.name'
        },
        {
          Header: 'Abuser Name',
          accessor: 'abuser_id.name'
        },
        {
          Header: 'Victim Outcomes',
          columns: [
            {
              Header: 'Connection to Domestic Violence Services',
              accessor: 'outcome_id.connection_to_domestic_violence_services'
            },
            {
              Header: 'Engagement in Ongoing Domestic Violence Services',
              accessor:
                'outcome_id.engagement_in_ongoing_domestic_violence_services'
            }
          ]
        },
        {
          Header: 'CJ Intervention',
          columns: [
            {
              Header: 'Charges Filed At or After Case Acceptance',
              accessor: 'outcome_id.charges_filed_at_or_after_case_acceptance'
            }
          ]
        },
        {
          Header: ' ',
          columns: [
            {
              Header: 'Pretrial Hearing Outcome',
              accessor: 'outcome_id.pretrial_hearing_outcome'
            }
          ]
        },
        {
          Header: 'Sentencing Outcomes',
          columns: [
            {
              Header: 'Sentencing Outcomes Disposition',
              accessor: 'outcome_id.sentencing_outcomes_disposition'
            },
            {
              Header: 'Sentencing Outcomes Sentence',
              accessor: 'outcome_id.sentencing_outcomes_sentence'
            }
          ]
        }
      ]
    }
  }

  componentDidMount () {
    this.showTab(0)
    const { cookies } = this.props
    var token = cookies.get('token')
    if (token === '') {
      window.location.reload()
    }
    fetch(CASES_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(results => {
        if (results.status !== 200) {
          document.getElementById('err').innerHTML = '<br />An error has occured, please refresh the page or try again later.'
          console.log(results)
        } else {
          return results.json()
            .then(results => {
              try {
                var data = JSON.parse(results)
              } catch (err) {
                document.getElementById('err').innerHTML = '<br />An error has occured, please refresh the page or try again later.'
                console.log(err)
                return
              }
              if (data.data) {
                this.setState({ cases: data.data })
              }
              this.setState({ loading: false, community_id: data.community_id, community_name: data.community_name })
              this.changePage(1)
            })
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

  showTab (index) {
    if (index === 0) { this.getTabInfo('Victim') } else if (index === 1) { this.getTabInfo('Abuser') } else if (index === 2) { this.getTabInfo('RiskFactors') } else { this.getTabInfo('Outcomes') }
  }

  // changes which page of case entries is shown
  changePage (page) {
    var i, pageNavs

    this.setState({ page: page }, () => {
      // set all page_nav elements to not bold and not underlined
      pageNavs = document.getElementsByClassName('page_nav')
      for (i = 0; i < pageNavs.length; i++) {
        pageNavs[i].style['font-weight'] = 'normal'
        pageNavs[i].style['text-decoration'] = 'none'
      }

      // bold and underline current page_nav
      document.getElementById(page + '_page').style['font-weight'] = 'bold'
      document.getElementById(page + '_page').style['text-decoration'] = 'underline'
    })
  }

  render () {
    const loading = this.state.loading
    const entries = this.state.cases.length
    const numPages = parseInt((entries || 1) / 20) + ((entries % 20) ? 1 : 1)
    const page = this.state.page

    return (
      <div>
        <NavigationBar />
        <div class="row">
          <div class="col-3">
          </div>
          <div class="col-6">
            <h1 class="header">{this.state.community_name}</h1>
          </div>
          <div class="col-3">
            <div class="stack row">
              <a href={'/site/add-case?com_id=' + this.state.community_id}>
                <div class="add_a_case">Add a Case +</div>
              </a>
            </div>
            <div class="stack row">
              <a href={'/site/site-summary?com_id=' + this.state.community_id + '&com_name=' + this.state.community_name}>
                <div class="add_a_case">View Summary</div>
              </a>
            </div>
          </div>
        </div>
        <TabObj clasName="overflowtab" selectFunc={(index, label) => this.showTab(index)}/>
        <div id='Victim' className='tabcontent'>
          <OverviewTable columns={this.state.victim_columns} data={this.state.cases} linkName={'siteOverview'} page={page} />
        </div>
        <div id='Abuser' className='tabcontent'>
          <OverviewTable columns={this.state.abuser_columns} data={this.state.cases} linkName={'siteOverview'} page={page} />
        </div>
        <div id='Outcomes' className='tabcontent '>
          <OverviewTable columns={this.state.outcomes_columns} data={this.state.cases} linkName={'siteOverview'} page={page} />
        </div>
        <div id='RiskFactors' className='tabcontent overflowtab'>
          <OverviewTable columns={this.state.risk_factor_columns} data={this.state.cases} linkName={'siteOverview'} page={page} />
        </div>
        <div id="err"></div>
        Page:
        {[...Array(numPages).keys()].map((i) => (
          <a class="page_nav" id={(i + 1) + '_page'} onClick={() => this.changePage(i + 1) }> {i + 1} </a>
        ))}
        {loading ? (<Loading />) : null}
      </div>
    )
  }
}

export default withCookies(siteOverview)
