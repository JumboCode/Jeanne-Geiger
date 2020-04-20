import React, { Component } from 'react'
import './rf_filter.css'
import Popup from './popup.js'

class RFFilter extends Component {
  constructor (props) {
    super(props)
    this.state = { showPopup: false, callback_func: props.cb }
  }

  openPopup () {
    console.log('open')
    this.setState({
      showPopup: true
    })
  }

  closePopup (cols) {
    console.log('close')
    console.log(cols)
    this.setState({
      showPopup: false
    })
    if (cols !== []) { this.state.callback_func(cols) }
  }

  foo () {
    console.log('close')
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
          ? <Popup

            closePopupWithDone={this.closePopup.bind(this)}
            closePopupWithX={this.foo.bind(this)}
          />
          : null
        }

      </div>
    )
  }
}

export default RFFilter
