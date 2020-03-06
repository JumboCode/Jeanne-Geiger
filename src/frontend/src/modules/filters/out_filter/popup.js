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
                          Victim Name
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Abuser Name
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Connection to Domestic Violece Services
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Engagement in Ongoing Domestic Violece Services
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Charges at or after case
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Pretrial Hearing Outcome
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Sentencing Outcomes Disposition
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                          Sentencing Outcomes Sentence
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
