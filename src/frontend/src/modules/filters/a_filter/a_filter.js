import React, { Component } from 'react'
import './a_filter.css'
import Popup from './popup.js'

class AFilter extends Component {
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
      <div className="filter_container1">
        <button type="button" className="filter_button1" onClick={this.togglePopup.bind(this)}>
                    Filter Results
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

export default AFilter
