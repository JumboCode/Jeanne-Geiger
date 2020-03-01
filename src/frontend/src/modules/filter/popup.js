import React from 'react'
import './popup.css'

class Popup extends React.Component {
  render () {
    return (
      <div className='popup'>
        <div className='popup\_inner'>
                What filters would you like to display?

          <div className='container'>
            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          DOB
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Gender
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Race/Ethnicity
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Age at Case Acceptance
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Primary Language
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Town
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Relationship Type
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Length
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Minor Children at Home
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Referral Source
            </label>
          </div>
          <button className='exit_button' onClick={this.props.closePopup}>X</button>

          <h1>{this.props.text}</h1>
          <button className='close_button' onClick={this.props.closePopup}>Done</button>
        </div>
      </div>
    )
  }
}

export default Popup
