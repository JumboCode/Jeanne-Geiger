import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import NavigationBar from '../../navbar/NavigationBar.js'
import OverviewTable from '../../overviewTable/overviewTable.js'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'
import { DOMAIN } from '../../../utils/index.js'

const COMMUNITY_LIST_URL = DOMAIN + 'api/communities/'
const ACTIVE_CASE_COUNT_URL = DOMAIN + 'api/ActiveCaseCountView/'

class adminHomepage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor () {
    super()
    this.state = {
      loading: true,
      communities: [],
      columns: [
        {
          Header: 'Date Created',
          accessor: 'date_created'
        },
        {
          Header: 'Site Name',
          accessor: 'community_name'
        },
        {
          Header: 'Last Updated',
          accessor: 'last_updated'
        },
        {
          Header: '# of Active Cases',
          accessor: 'num_active'
        }
      ]
    }
  }

  componentDidMount () {
    // Forces a refresh when the back button was used -- fixed back button bug where number
    // of active cases was incorrect if /admin was reach through back button
    // source: https://stackoverflow.com/a/43043658
    window.addEventListener('pageshow', function (event) {
      var historyTraversal = event.persisted ||
                             (typeof window.performance !== 'undefined' &&
                                  window.performance.navigation.type === 2)
      if (historyTraversal) {
        window.location.reload()
      }
    })
    const { cookies } = this.props
    var token = cookies.get('token')
    // handle if token is not loaded in cookies yet
    if (token === '') {
      window.location.reload()
    }

    fetch(COMMUNITY_LIST_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    ).then(results => {
      return results.json()
    }).then(communities => {
      // communities is a list of community objects
      // for each community object, get its active case count and add it to
      // the per community data
      Promise.all(communities.map(community =>
        fetch(ACTIVE_CASE_COUNT_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            communityid: community.community_id
          }
        })
          .then(results => {
            return results.text()
          })
          .then(text => {
            community.num_active = JSON.parse(text).case_count
          })
      )).then(() => {
        this.setState({ loading: false })
        if (communities) { this.setState({ communities: communities }) }
      })
    })
  }

  render () {
    const loading = this.state.loading
    return (
      <div>
        <NavigationBar />
        <a href="/admin/add-site" ><div class="add_a_site_button">Add a New Site + </div></a>
        <OverviewTable columns={this.state.columns} data={this.state.communities} linkName={'adminOverview'} />
        {loading ? (<div className="loading">Loading Data...</div>) : null}
      </div>
    )
  }
}

export default withCookies(adminHomepage)
