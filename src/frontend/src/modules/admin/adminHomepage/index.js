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
          Header: 'Site Name',
          accessor: 'community_name'
        }
        // {
        //   Header: 'Last Updated',
        //   accessor: 'community_id'
        // },
      ]
    }
  }

  componentDidMount () {
    fetch(COMMUNITY_LIST_URL
    ).then(results => {
      return results.json()
    }).then(data => {
      console.log(data)
      this.setState({ communities: data })
    })
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <a href="/admin/add-site" ><div class="add_a_site_button">Add a New Site +</div></a>
        <OverviewTable columns={this.state.columns} data={this.state.communities} linkName={'adminOverview'} />
      </div>
    )
  }
}

export default adminHomepage
