import React from 'react'
import './popup.css'

class Popup extends React.Component {
  getListOfRequestedCols () {
    var cols = []
    if (!document.getElementById('afilter_date_created').checked) { cols.push('Date Created') }
    if (!document.getElementById('afilter_status').checked) { cols.push('Status') }
    if (!document.getElementById('afilter_name').checked) { cols.push('Name') }
    if (!document.getElementById('afilter_dob').checked) { cols.push('DOB') }
    if (!document.getElementById('afilter_gender').checked) { cols.push('Gender') }
    if (!document.getElementById('afilter_race_ethnicity').checked) { cols.push('Race/Ethnicity') }
    if (!document.getElementById('afilter_age_at_acc').checked) { cols.push('Age at Case Acceptance') }
    if (!document.getElementById('afilter_prim_lang').checked) { cols.push('Primary Language') }
    if (!document.getElementById('afilter_town').checked) { cols.push('Town') }

    return cols
  }

  render () {
    return (
      <div className='popup'>
        <div className='popup\_inner'>
                What filters would you like to display?

          <div className='container'>
            <label class="check_container">
              <input id="afilter_date_created" type="checkbox"></input>
              <span class="checkmark"></span>
                          Date Created
            </label>

            <label class="check_container">
              <input id="afilter_status" type="checkbox"></input>
              <span class="checkmark"></span>
                          Status
            </label>

            <label class="check_container">
              <input id="afilter_name" type="checkbox"></input>
              <span class="checkmark"></span>
                          Name
            </label>

            <label class="check_container">
              <input id="afilter_dob" type="checkbox"></input>
              <span class="checkmark"></span>
                          DOB
            </label>

            <label class="check_container">
              <input id="afilter_gender" type="checkbox"></input>
              <span class="checkmark"></span>
                          Gender
            </label>

            <label class="check_container">
              <input id="afilter_race_ethnicity" type="checkbox"></input>
              <span class="checkmark"></span>
                          Race/Ethnicity
            </label>

            <label class="check_container">
              <input id="afilter_age_at_acc" type="checkbox"></input>
              <span class="checkmark"></span>
                          Age at Case Acceptance
            </label>

            <label class="check_container">
              <input id="afilter_prim_lang" type="checkbox"></input>
              <span class="checkmark"></span>
                          Primary Language
            </label>

            <label class="check_container">
              <input id="afilter_town" type="checkbox"></input>
              <span class="checkmark"></span>
                          Town
            </label>
          </div>

          <button className='exit_button' onClick={this.props.closePopupWithX}>X</button>

          <h1>{this.props.text}</h1>
          <button className='close_button' onClick={() => this.props.closePopupWithDone(this.getListOfRequestedCols())}>Done</button>
        </div>
      </div>
    )
  }
}

export default Popup
