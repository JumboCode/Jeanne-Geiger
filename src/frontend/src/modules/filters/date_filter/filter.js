import React, { Component } from 'react'
import './filter.css'
import Popup from './popup.js'

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
      <div className="filter_container">
        <button type="button" onClick={this.togglePopup.bind(this)}>
                    filter results
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
