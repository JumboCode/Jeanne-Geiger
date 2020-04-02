import React from 'react';
import './popup.css';


const DateInputObj = (props) => {
  return (
    <div class="form-group">
      <label for={props.id}>{props.title}</label>
      <input type="date" class="form-control" id={props.id} placeholder={'Enter ' + props.title}></input>
    </div>
  )
}

class Popup extends React.Component {
    render() {
        return (
            <div class='popup'>
                <div class='popup\_inner'>
                  <p class="title"> Select the date and end dates for the report you would like to generate.</p>

                    <div class='container'>
                      <DateInputObj title='End Date' id='start_date'/>
                      <DateInputObj title='Start Date' id='end_date'/>
                      <h1>{this.props.text}</h1>
                    <button class='close_button' onClick={this.props.closePopup}>Generate</button>
                    </div>
                    <button class='exit_button' onClick={this.props.closePopup}>X</button>

                    
                </div>
            </div>
        );
    }
}

export default Popup;