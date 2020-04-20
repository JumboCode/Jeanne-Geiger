import React from 'react'
import './popup.css'

class Popup extends React.Component {
  getListOfRequestedCols() {
    var cols = []
    if (!document.getElementById('ofilter_date_created').checked) { cols.push('Date Created') }
    if (!document.getElementById('ofilter_vname').checked) { cols.push('Victim Name') }
    if (!document.getElementById('ofilter_aname').checked) { cols.push('Abuser Name') }
    if (!document.getElementById('ofilter_victim_outcomes').checked) { cols.push('Victim Outcomes') }
    if (!document.getElementById('ofilter_cj_intervention').checked) { cols.push('CJ Intervention') }
    if (!document.getElementById('ofilter_sentencing_outcomes').checked) { cols.push('Sentencing Outcomes') }
    if (!document.getElementById('ofilter_blank').checked) { cols.push(' ') }

    return cols
  }

  render () {
    return (
      <div className='popup'>
        <div className='popup\_inner'>
                What filters would you like to display?

          <div className='container'>
            <label class="check_container">
              <input id="ofilter_date_created" type="checkbox"></input>
              <span class="checkmark"></span>
                          Date Created
            </label>

            <label class="check_container">
              <input id="ofilter_vname" type="checkbox"></input>
              <span class="checkmark"></span>
                          Victim Name
            </label>

            <label class="check_container">
              <input id="ofilter_aname" type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Abuser Name
            </label>

            <label class="check_container">
              <input id="ofilter_victim_outcomes" type="checkbox"></input>
              <span class="checkmark"></span>
                          Victim Outcomes
            </label>

            <label class="check_container">
              <input id="ofilter_cj_intervention" type="checkbox"></input>
              <span class="checkmark"></span>
                          CJ Intervention
            </label>

            <label class="check_container">
              <input id="ofilter_blank" type="checkbox"></input>
              <span class="checkmark"></span>
                          Pretrial Hearing Outcome
            </label>

            <label class="check_container">
              <input id="ofilter_sentencing_outcomes" type="checkbox"></input>
              <span class="checkmark"></span>
                          Sentencing Outcomes
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
