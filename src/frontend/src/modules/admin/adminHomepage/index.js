import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import NavigationBar from '../../navbar/NavigationBar.js'
import OverviewTable from '../../overviewTable/overviewTable.js'
import Loading from '../../logIn/Loading.js'
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
      page: 1,
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
      if (results.status !== 200) {
        document.getElementById('err').innerHTML = 'An error has occured, please refresh the page or try again later.'
        console.log(results)
        return
      }
      return results.json()
        .then(communities => {
          // communities is a list of community objects
          // for each community object, get its active case count and add it to
          // the per community data
          try {
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
              this.changePage(1)
            })
          } catch (err) {
            document.getElementById('err').innerHTML = 'An error has occured, please refresh the page or try again later.'
            console.log(err)
          }
        })
    })
  }

  // changes which page of site entries is shown
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
    const entries = this.state.communities.length
    const numPages = parseInt((entries || 1) / 20) + ((entries % 20) ? 1 : 0)
    const page = this.state.page

    return (
      <div>
        <NavigationBar />
        <a href="/admin/add-site" ><div class="add_a_site_button">Add a New Site + </div></a>
        <OverviewTable columns={this.state.columns} data={this.state.communities} linkName={'adminOverview'} page={page}/>
        <div id='err'></div>
        Page:
        {[...Array(numPages).keys()].map((i) => (
          <a class="page_nav" id={(i + 1) + '_page'} onClick={() => this.changePage(i + 1) }> {i + 1} </a>
        ))}
        {loading ? (<Loading />) : null}
      </div>
    )
  }
}

export default withCookies(adminHomepage)
