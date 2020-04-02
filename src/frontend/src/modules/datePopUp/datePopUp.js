import React, { Component } from 'react'
import 'bootstrap-daterangepicker/daterangepicker.css';
import './datePopUp.css'

class DatePopUp extends Component {
  constructor (props) {
    super(props)
    this.state = { 

      showPopup: false 
    }
  }

  handleApply(event, picker) {
    console.log(picker.startDate);
  }


  render () {
    return (
      <div className="datePopUp_container">
        <button type="button" onClick={this.togglePopup.bind(this)}>
                    date pop up
        </button>
      </div>
    )
  }
}

export default DatePopUp