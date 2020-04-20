import React from 'react'
import './popup.css'

class Popup extends React.Component {
getListOfRequestedCols () {
    var cols = []
    if (!document.getElementById('rffilter_date_created').checked) { cols.push('Date Created') }
    if (!document.getElementById('rffilter_vname').checked) { cols.push('Victim Name') }
    if (!document.getElementById('rffilter_aname').checked) { cols.push('Abuser Name') }
    if (!document.getElementById('rffilter_increased_violence').checked) { cols.push('Increased Violence') }
    if (!document.getElementById('rffilter_rec_sep').checked) { cols.push('Recent Separation') }
    if (!document.getElementById('rffilter_cont_daily_act').checked) { cols.push('Controls Daily Activities') }
    if (!document.getElementById('rffilter_tried_to_kill').checked) { cols.push('Tried to Kill') }
    if (!document.getElementById('rffilter_threats_to_kill').checked) { cols.push('Threats to Kill') }
    if (!document.getElementById('rffilter_weap_use_or_threat').checked) { cols.push('Weapon Use/Threats') }
    if (!document.getElementById('rffilter_strang').checked) { cols.push('Strangulation') }
    if (!document.getElementById('rffilter_mult_strang').checked) { cols.push('Multiple Strangulations') }
    if (!document.getElementById('rffilter_cap_of_killing').checked) { cols.push('Capable of Killing') }
    if (!document.getElementById('rffilter_gun_ownership').checked) { cols.push('Gun Ownership') }
    if (!document.getElementById('rffilter_threats_or_attempts_suic').checked) { cols.push('Threats/Attempts Suicide') }
    if (!document.getElementById('rffilter_unemployed').checked) { cols.push('Unemployed') }
    if (!document.getElementById('rffilter_avoided_arrest').checked) { cols.push('Avoided Arrest') }
    if (!document.getElementById('rffilter_child_not_theirs').checked) { cols.push('Child not theirs') }
    if (!document.getElementById('rffilter_illegal_drug_use').checked) { cols.push('Illegal Drug Use') }
    if (!document.getElementById('rffilter_alcoholic').checked) { cols.push('Alcoholic') }
    if (!document.getElementById('rffilter_forced_sex').checked) { cols.push('Forced Sex') }
    if (!document.getElementById('rffilter_jealousy').checked) { cols.push('Jealousy') }
    if (!document.getElementById('rffilter_beaten_pregnant').checked) { cols.push('Beaten while Pregnant') }
    if (!document.getElementById('rffilter_threaten_children').checked) { cols.push('Threats to Small Children') }
    if (!document.getElementById('rffilter_stalking_behavior').checked) { cols.push('Stalking Behavior') }

    return cols
  }

  render () {
    return (
      <div className='popup'>
        <div className='popup\_inner'>
                What filters would you like to display?

          <div className='container'>
            <label class="check_container">
              <input id="rffilter_date_created" type="checkbox"></input>
              <span class="checkmark"></span>
                Date Created
            </label>

            <label class="check_container">
              <input id="rffilter_vname" type="checkbox"></input>
              <span class="checkmark"></span>
                Victim Name
            </label>

            <label class="check_container">
              <input id="rffilter_aname" type="checkbox"></input>
              <span class="checkmark"></span>
                Abuser Name
            </label>

            <label class="check_container">
              <input id="rffilter_increased_violence" type="checkbox"></input>
              <span class="checkmark"></span>
                Increased Violence
            </label>

            <label class="check_container">
              <input id="rffilter_rec_sep" type="checkbox"></input>
              <span class="checkmark"></span>
                Recent Separation
            </label>

            <label class="check_container">
              <input id="rffilter_cont_daily_act" type="checkbox"></input>
              <span class="checkmark"></span>
                Controls Daily Activities
            </label>

            <label class="check_container">
              <input id="rffilter_tried_to_kill" type="checkbox"></input>
              <span class="checkmark"></span>
                Tried to Kill
            </label>

            <label class="check_container">
              <input id="rffilter_threats_to_kill" type="checkbox"></input>
              <span class="checkmark"></span>
                Threats to Kill
            </label>

            <label class="check_container">
              <input id="rffilter_weap_use_or_threat" type="checkbox"></input>
              <span class="checkmark"></span>
                Weapon Use/Threats
            </label>

            <label class="check_container">
              <input id="rffilter_strang" type="checkbox"></input>
              <span class="checkmark"></span>
                Strangulation
            </label>

            <label class="check_container">
              <input id="rffilter_mult_strang" type="checkbox"></input>
              <span class="checkmark"></span>
                Multiple Strangulations
            </label>

          </div>
          <div className='container2'>
          
            <label class="check_container2">
              <input id="rffilter_cap_of_killing" type="checkbox"></input>
              <span class="checkmark"></span>
                Capable of Killing
            </label>

            <label class="check_container2">
              <input id="rffilter_gun_ownership" type="checkbox"></input>
              <span class="checkmark"></span>
                Gun Ownership 
            </label>

            <label class="check_container2">
              <input id="rffilter_threats_or_attempts_suic" type="checkbox"></input>
              <span class="checkmark"></span>
                Threats/Attempts Suicide
            </label>

            <label class="check_container2">
              <input id="rffilter_unemployed" type="checkbox"></input>
              <span class="checkmark"></span>
                Unemployed
            </label>

            <label class="check_container2">
              <input id="rffilter_avoided_arrest" type="checkbox"></input>
              <span class="checkmark"></span>
                Avoided Arrest
            </label>

            <label class="check_container2">
              <input id="rffilter_child_not_theirs" type="checkbox"></input>
              <span class="checkmark"></span>
                Child not theirs
            </label>

            <label class="check_container2">
              <input id="rffilter_illegal_drug_use" type="checkbox"></input>
              <span class="checkmark"></span>
                Illegal Drug Use
            </label>

            <label class="check_container2">
              <input id="rffilter_alcoholic" type="checkbox"></input>
              <span class="checkmark"></span>
                Alcoholic
            </label>

            <label class="check_container2">
              <input id="rffilter_forced_sex" type="checkbox"></input>
              <span class="checkmark"></span>
                Forced Sex
            </label>

            <label class="check_container2">
              <input id="rffilter_jealousy" type="checkbox"></input>
              <span class="checkmark"></span>
                Jealousy
            </label>

            <label class="check_container2">
              <input id="rffilter_beaten_pregnant" type="checkbox"></input>
              <span class="checkmark"></span>
                Beaten while Pregnant
            </label>

            <label class="check_container2">
              <input id="rffilter_threaten_children" type="checkbox"></input>
              <span class="checkmark"></span>
                Threats to Small Children
            </label>

            <label class="check_container2">
              <input id="rffilter_stalking_behavior" type="checkbox"></input>
              <span class="checkmark"></span>
                Stalking Behavior
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
