import React, { Component } from 'react'
import './filter.css'
import Popup from './popup.js'
import dateRange from './calendar.png'

class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = { showPopup: false }
  }

  togglePopup () {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render () {
    return (
      <div className="date-filter-container">
        <button type="button" class="date_range_button" onClick={this.togglePopup.bind(this)}>
                     Date Range &nbsp; &nbsp;<img class="calendar" src={dateRange} alt='calendar' />
        </button>

        {this.state.showPopup
          ? <Popup

            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }

      </div>
    )
  }
}

export default Filter
