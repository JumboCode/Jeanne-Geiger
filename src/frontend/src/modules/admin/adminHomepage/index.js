import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import './styles.css'
import { Button, Card } from 'react-bootstrap';
import { render } from 'react-dom'

class adminHomepage extends React.Component {
  render () {
    return (
      <div>
        <h1>admin page</h1>
        <a href="/admin/add-site">Add a site</a>
        <a href="/admin/view-site">View a site</a>
        <h1>{this.props.path}</h1>
	<Button variant="primary" size="lg" active>
	  I am a Button
	</Button>
	<Card>
	    <Card.Header>Cleveland DVHRT</Card.Header>
	    <Card.Body>
	    	Big Blue Rectangle goes here!
	    	<br /> More things will go here!
	    </Card.Body>
	</Card>
      </div>
    )
  }
}

export default adminHomepage
