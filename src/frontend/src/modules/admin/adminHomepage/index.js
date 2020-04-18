import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './styles.css'
import { render } from 'react-dom'
import NavigationBar from '../../navbar/NavigationBar.js'
import OverviewTable from '../../overviewTable/overviewTable.js'

const COMMUNITY_LIST_URL = 'http://127.0.0.1:8000/api/communities/'

class adminHomepage extends React.Component {
  constructor () {
    super()
    this.state = {
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
      ]
    }
  }

  componentDidMount () {
    fetch(COMMUNITY_LIST_URL
    ).then(results => {
      return results.json()
    }).then(data => {
      this.setState({ communities: data })
    })
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <a href="/admin/add-site" ><div class="add_a_site_button">Add a New Site + </div></a>
        <OverviewTable columns={this.state.columns} data={this.state.communities} linkName={'adminOverview'} />
      </div>
    )
  }
}

export default adminHomepage
