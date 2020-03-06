import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import VFilter from '../../filters/v_filter/filter.js'
import AFilter from '../../filters/a_filter/a_filter.js'
import RFFilter from '../../filters/rf_filter/rf_filter.js'
import OUTFilter from '../../filters/out_filter/out_filter.js'
import NavigationBar from '../../navbar/NavigationBar.js'
import Button from 'react-bootstrap/Button'
import TabObj from '../../tabs.js'
import { useTable, useSortBy } from 'react-table'
import Table from 'react-bootstrap/Table'

const CASES_URL = 'http://localhost:8000/api/CasesByCommunity/'

// source: https://codesandbox.io/s/github/tannerlinsley/react-table/tree/master/examples/sorting
function MyTable ({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <Table striped border hover {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  scope="col"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr data-href={'/site/case-view?case_id=' + data[i].case_id} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>

      <script>
      document.addEventListener("DOMContentLoaded", () => {
          document.querySelectorAll('tr[data-href]').forEach(row => {
            row.addEventListener('click', () => {
              window.location.href = row.dataset.href
            })
          })
        })
      </script>
    </>
  )
}

class siteOverview extends React.Component {
  constructor () {
    super()
    this.state = {
      cases: [],
      victim_columns: [
        {
          Header: 'Date Created',
          accessor: 'date_accepted'
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
          Header: 'Abuser Information',
          columns: [
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
            }
          ]
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
    fetch(CASES_URL)
      .then(results => {
        return results.json()
      })
      .then(data => this.setState({ cases: data }))
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

  render () {
    return (
      <div>
        <NavigationBar />
        <a href="/site/add-case"> add a case</a>
        <TabObj selectFunc={(index, label) => this.showTab(index)}/>
        <div id='Victim' className='tabcontent'>
          <VFilter />
          <MyTable columns={this.state.victim_columns} data={this.state.cases}/>
        </div>
        <div id='Abuser' className='tabcontent'>
          <AFilter />
          <MyTable columns={this.state.abuser_columns} data={this.state.cases} />
        </div>
        <div id='Outcomes' className='tabcontent'>
          <OUTFilter />
          <MyTable columns={this.state.outcomes_columns} data={this.state.cases} />
        </div>
        <div id='RiskFactors' className='tabcontent'>
          <RFFilter />
          <MyTable columns={this.state.risk_factor_columns} data={this.state.cases}/>
        </div>
      </div>
    )
  }
}

export default siteOverview
// Outcome filter <Filter />
// rf filter
