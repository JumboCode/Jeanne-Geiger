import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'

const GET_CASE_URL = 'http://localhost:8000/api/one-case/'

class detailView extends React.Component {
  constructor () {
    super()
    this.state = {
      case: [],
    }
  }

  componentDidMount () {
    fetch(GET_CASE_URL, {
        headers: {
          caseid: this.getUrlVars()
        }
      })
      .then(results => {
        return results.json()
      })
      .then(data => this.setState({ case: data }))
  }

  getUrlVars() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      console.log(vars["case_id"])
      return vars["case_id"];
  }

  render () {
    return (
      <div>
        <h1>site detail view</h1>
        {console.log(this.state.case)}
      </div>
    )
  }
}

export default detailView
