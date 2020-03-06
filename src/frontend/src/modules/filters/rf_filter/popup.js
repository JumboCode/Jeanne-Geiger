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
                Physical Violence Increased
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Left in Past Year
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Control Activities
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Tried to Kill
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Threat to Kill
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Used Weapon
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Tried Choke
            </label>

            <label class="check_container">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Has Choked Multiple Times
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Able to Kill
            </label>

          </div>
          <div className='container2'>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Owns Gun
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Threat or Tried Suicide
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Unemployed
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Avoided Arrest
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Child not theirs
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Use Drugs
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Alcoholic
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Forced Sex
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Jealous
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Beaten While Pregnant
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Threaten Children
            </label>

            <label class="check_container2">
              <input type="checkbox">
              </input>
              <span class="checkmark"></span>
                Spied or Left Notes
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
