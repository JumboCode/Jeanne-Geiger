import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
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
              <tr data-href="/site/case-view" {...row.getRowProps()}>
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
            'Has the physical violence increased in severity or frequency over the past year?',
          accessor: 'risk_factor_id.violence_increased'
        },
        {
          Header:
            'Have you left him/her after living together in the past year?',
          accessor: 'risk_factor_id.attempted_leaving'
        },
        {
          Header: 'Does he/she control most or all of your daily activities?',
          accessor: 'risk_factor_id.control_activites'
        },
        {
          Header: 'Has he/she tried to kill you?',
          accessor: 'risk_factor_id.attempted_murder'
        },
        {
          Header: 'Has he/she ever threatened to kill you?',
          accessor: 'risk_factor_id.threatened_murder'
        },
        {
          Header:
            'Has he/she used a weapon against you or threatened you with a lethal weapon?',
          accessor: 'risk_factor_id.weapon_threat'
        },
        {
          Header: 'Has he/she ever tried to choke (strangle) you?',
          accessor: 'risk_factor_id.attempted_choke'
        },
        {
          Header: 'Has he/she choked (strangled) you multiple times?',
          accessor: 'risk_factor_id.multiple_choked'
        },
        {
          Header: 'Do you believe he/she is capable of killing you?',
          accessor: 'risk_factor_id.killing_capable'
        },
        {
          Header: 'Does he/she own a gun?',
          accessor: 'risk_factor_id.owns_gun'
        },
        {
          Header: 'Has he/she ever threatened or tried to commit suicide?',
          accessor: 'risk_factor_id.suicide_threat_or_attempt'
        },
        {
          Header: 'Is he/she unemployed?',
          accessor: 'risk_factor_id.is_unemployed'
        },
        {
          Header: 'Has he/she avoided being arrested for domestic violence?',
          accessor: 'risk_factor_id.avoided_arrest'
        },
        {
          Header: 'Do you have a child that is not his/hers?',
          accessor: 'risk_factor_id.unrelated_child'
        },
        {
          Header: 'Does he/she use illegal drugs?',
          accessor: 'risk_factor_id.uses_illegal_drugs'
        },
        {
          Header: 'Is he/she an alcoholic or problem drinker?',
          accessor: 'risk_factor_id.is_alcoholic'
        },
        {
          Header:
            'Has he/she ever forced you to have sex when you did not wish to do so?',
          accessor: 'risk_factor_id.forced_sex'
        },
        {
          Header: 'Is he/she violently or constantly jealous?',
          accessor: 'risk_factor_id.constantly_jealous'
        },
        {
          Header: 'Has he/she ever beaten you while you were pregnant?',
          accessor: 'risk_factor_id.pregnant_abuse'
        },
        {
          Header: 'Threatens to harm victim’s children?',
          accessor: 'risk_factor_id.children_threatened'
        },
        {
          Header:
            'Does he/she spy on you, leaving threatening notes or messages?',
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
    fetch(CASES_URL)
      .then(results => {
        return results.json()
      })
      .then(data => this.setState({ cases: data }))
  }

  render () {
    return (
      <div>
        <h1>Site overview</h1>
        <a href="/site/case-view">case detail view</a>
        <a href="/site/add-case"> add a case</a>
        <p>Victim Tab</p>
        <MyTable columns={this.state.victim_columns} data={this.state.cases} />
        <p>Abuser Tab</p>
        <MyTable columns={this.state.abuser_columns} data={this.state.cases} />
        <p>Risk Factors Tab</p>
        {console.log(this.state.cases)}
        <MyTable
          columns={this.state.risk_factor_columns}
          data={this.state.cases}
        />
        <p>Outcomes Tab</p>
        <MyTable columns={this.state.outcomes_columns} data={this.state.cases} />
      </div>
    )
  }
}

export default siteOverview
