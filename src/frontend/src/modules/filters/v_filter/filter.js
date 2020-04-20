import React, { Component } from 'react'
import './filter.css'
import Popup from './popup.js'

class VFilter extends Component {
  constructor (props) {
    super(props)
    this.state = { showPopup: false, callback_func: props.cb, already_unchecked: props.prepopulate }
  }

  openPopup () {
    this.setState({
      showPopup: true
    })
  }

  closePopupWithDone (cols) {
    this.setState({
      showPopup: false
    })
    if (cols !== []) { this.state.callback_func(cols) }
  }

  closePopupWithX () {
    this.setState({
      showPopup: false
    })
  }

  render () {
    return (
      <div className="filter_container">
        <button type="button" className="filter_button" onClick={this.openPopup.bind(this)}>
                    Filter Results
        </button>

        {this.state.showPopup
          ? <Popup already_unchecked={this.state.already_unchecked}

            closePopupWithDone={this.closePopupWithDone.bind(this)}
            closePopupWithX={this.closePopupWithX.bind(this)}
          />
          : null
        }

      </div>
    )
  }
}

export default VFilter
