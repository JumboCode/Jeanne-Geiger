import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import DateRangePicker from 'bootstrap-daterangepicker/daterangepicker.css';
import ReactDOM from 'react-dom';


//https://github.com/skratchdot/react-bootstrap-daterangepicker
class Datepopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showPopup: false };
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    render() {
        return (
            <DateRangePicker startDate="1/1/2014" endDate="3/1/2014">
                <button type="button" onClick={this.togglePopup.bind(this)}>
                    Select date range
                </button>

                {this.state.showPopup ?
                    <Datepopup

                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </DateRangePicker>
        );
    }

}




export default Datepopup;