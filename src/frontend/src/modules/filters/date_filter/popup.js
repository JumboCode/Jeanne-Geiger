import React from 'react'
import './popup.css'

const DateInputObj = (props) => {
  return (
    <div class="form-group">
      <label for={props.id}>{props.title}</label>
      <input type="date" class="form-control" id={props.id} placeholder={'Enter ' + props.title}></input>
    </div>
  )
}

class Popup extends React.Component {
  render () {
    return (
      <div class='popup'>
        <div class='popup\_inner'>
          <p class="title"> Select the date and end dates for the report you would like to generate.</p>

          <div class='container'>
            <DateInputObj title='Start Date' id='start_date'/>
            <DateInputObj title='End Date' id='end_date'/>
            <h1>{this.props.text}</h1>
            <button class='close_button'
              onClick={() => {
                var params = new URLSearchParams()
                params.set('start_date', document.getElementById('start_date').value)
                params.set('end_date', document.getElementById('end_date').value)
                window.location.search += '&' + params.toString()
              }}>
              Generate
            </button>
          </div>
          <button class='exit_button' onClick={this.props.closePopup}>x</button>

        </div>
      </div>
    )
  }
}

export default Popup
