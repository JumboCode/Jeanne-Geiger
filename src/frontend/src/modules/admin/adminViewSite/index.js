import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'

class adminViewSite extends React.Component {
	constructor() {
		super();
		this.state = {
			victim_info : {},
			abuser_info : {},
			risk_factor_info : {},
			outcome_info : {},
		};
	}

	componentDidMount() {
		fetch('http://127.0.0.1:8000/api/DVHRTHighRiskVictimInfo/')
		.then(results => {return results.json()})
		.then(data => {this.setState({victim_info : data.results})
			  console.log("state:", this.state.victim_info)})

	}


	render () {
		return (
			<div>
				<h1>Viewing a site</h1>
				<h1>{this.props.type}</h1>
				<div class="tab">
					<button class="tablinks" onClick="componentDidMount()">Victim</button>
					<button class="tablinks" onClick="openCity(event, 'Paris')">Abuser</button>
					<button class="tablinks" onClick="openCity(event, 'Tokyo')">Risk Factors</button>
					<button class="tablinks" onClick="openCity(event, 'Tokyo')">Outcomes</button>
				</div>

				<div id="Victim" class="tabcontent">
					<h3>Victim</h3>
					<p>This is the victim tab yo</p>
					<p>hey: {this.state.victim_info['Total Gender Count']}</p>
				</div>
			</div>
		)
	}
}

export default adminViewSite
