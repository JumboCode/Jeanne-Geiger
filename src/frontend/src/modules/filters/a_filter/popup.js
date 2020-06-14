import React from 'react'

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
                          Name
            </label>

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
