import React from 'react'
import './popup.css'

class Popup extends React.Component {
  getListOfRequestedCols() {
    var cols = []
    if (!document.getElementById('vfilter_date_created').checked) 
      cols.push('Date Created')
    if (!document.getElementById('vfilter_status').checked) 
      cols.push('Status')
    if (!document.getElementById('vfilter_name').checked) 
      cols.push('Name')
    if (!document.getElementById('vfilter_dob').checked) 
      cols.push('DOB')
    if (!document.getElementById('vfilter_gender').checked) 
      cols.push('Gender')
    if (!document.getElementById('vfilter_race_ethnicity').checked) 
      cols.push('Race/Ethnicity')
    if (!document.getElementById('vfilter_age_at_acc').checked) 
      cols.push('Age at Case Acceptance')
    if (!document.getElementById('vfilter_prim_lang').checked) 
      cols.push('Primary Language')
    if (!document.getElementById('vfilter_town').checked) 
      cols.push('Town')
    if (!document.getElementById('vfilter_rel_type').checked) 
      cols.push('Relationship Type')
    if (!document.getElementById('vfilter_rel_len').checked) 
      cols.push('Relationship Length')
    if (!document.getElementById('vfilter_minor_in_home').checked) 
      cols.push('Minor in Home')
    if (!document.getElementById('vfilter_ref_source').checked) 
      cols.push('Referral Source')

    return cols
  }

  render () {
    return (
      <div className='popup'>
        <div className='popup\_inner'>
                What filters would you like to display?

          <div className='container'>
            <label class="check_container">
              <input id="vfilter_date_created" type="checkbox"></input>
              <span class="checkmark"></span>
                          Date Created
            </label>

            <label class="check_container">
              <input id="vfilter_status" type="checkbox"></input>
              <span class="checkmark"></span>
                          Status
            </label>

            <label class="check_container">
              <input id="vfilter_name" type="checkbox"></input>
              <span class="checkmark"></span>
                          Name
            </label>

            <label class="check_container">
              <input id="vfilter_dob" type="checkbox"></input>
              <span class="checkmark"></span>
                          DOB
            </label>

            <label class="check_container">
              <input id="vfilter_gender" type="checkbox"></input>
              <span class="checkmark"></span>
                          Gender
            </label>

            <label class="check_container">
              <input id="vfilter_race_ethnicity" type="checkbox"></input>
              <span class="checkmark"></span>
                          Race/Ethnicity
            </label>

            <label class="check_container">
              <input id="vfilter_age_at_acc" type="checkbox"></input>
              <span class="checkmark"></span>
                          Age at Case Acceptance
            </label>

            <label class="check_container">
              <input id="vfilter_prim_lang" type="checkbox"></input>
              <span class="checkmark"></span>
                          Primary Language
            </label>

            <label class="check_container">
              <input id="vfilter_town" type="checkbox"></input>
              <span class="checkmark"></span>
                          Town
            </label>

            <label class="check_container">
              <input id="vfilter_rel_type" type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Relationship Type
            </label>

            <label class="check_container">
              <input id="vfilter_rel_len" type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Relationship Length
            </label>

            <label class="check_container">
              <input id="vfilter_minor_in_home" type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Minor Children at Home
            </label>

            <label class="check_container">
              <input id="vfilter_ref_source" type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Referral Source
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
