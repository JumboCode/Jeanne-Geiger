import React, { Component, useState } from 'react'
import './styles.css'
import { render } from 'react-dom'
import { TextInputObj } from './util.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import NavigationBar from '../../navbar/NavigationBar.js'
import Plus from './plus.png'
import Remove from './remove.png'

const SITE_POST_URL = 'placeholder'

class adminAddSite extends React.Component {
  state = {
    sources: [],
    coords: []
  }

  // Get both the first referral source and added sources separately
  // Same with Coords
  doSitePost() {
    return 'site_name=' + document.getElementById('site_name').value +
    '&coord_name=' + document.getElementById('coord_name').value +
    '&coord_email=' + document.getElementById('coord_email').value +
    '&referral_1=' + document.getElementById('referral_1').value +
    '&referral_2=' + document.getElementById('referral_2').value
  }
  
  addSource() {
    this.setState({sources: [...this.state.sources, ""]})
  }

  removeSource(index) {
    this.state.sources.splice(index, 1)
    this.setState({sources: this.state.sources})
  }

  addCoord() {
    this.setState({coords: [...this.state.coords, ""]})
  }

  removeCoord(index) {
    const values = [...]
    this.state.coords.splice(index, 1)
    this.setState({coords: this.state.coords})
  }

  render () {
    return (
      <div>
        <NavigationBar />
        <h2 class="title">Add New Site</h2>
        <h1>{this.props.type}</h1>
        <div class="container">
          <Form.Row>
            <Col>
              <TextInputObj title='Site Name' id='site_name'/>
              <TextInputObj title='Coordinator 1 Name' id='coord_name_1'/>
              <TextInputObj title='Coordinator 1 Email' id='coord_email_1'/>
              {
                this.state.coords.map((coords, i) => {
                  return (
                    <div key={i}>
                      <TextInputObj title={'Coordinator ' + (i + 2) + ' Name'} id={'coord_name_' + (i + 2)} />
                      <TextInputObj title={'Coordinator ' + (i + 2) + ' Email'} id={'coord_email_' + (i + 2)} />
                      <div class="buttons">
                        <button class="remove" onClick={(e)=>this.removeCoord(i)}><img class="logo" src={Remove} /></button>
                      </div>
                    </div>
                  )
                })
              }
              <div class="buttons">
                <button class="add" onClick={(e)=>this.addCoord(e)}><img class="logo" src={Plus} /> Add another Coordinator</button>
              </div>
            </Col>
            <Col>
              <TextInputObj class="referral" title='Referral Source 1' id='referral_1' />
              {
                this.state.sources.map((source, i) => {
                  return (
                    <div key={i}>
                      <TextInputObj class="referral" title={'Referral Source ' + (i + 2)} id={'referral_' + (i + 1)} />
                      <div class="buttons">
                        <button class="remove" onClick={(e)=>this.removeSource(i)}><img class="logo" src={Remove} /></button>
                      </div>
                    </div>
                  )
                })
              }
              <div class="buttons">
                <button class="add" onClick={(e)=>this.addSource(e)}><img class="logo" src={Plus} /> Add another Referral Source</button>
              </div>

            </Col>
          </Form.Row>
        </div>
        <div class="buttons">
          <button class="cancel_button">Cancel</button>
          <button type="save" class="save_button" onClick={() => this.doSubmit()} value="save">Save</button>
        </div>
      </div>
    )

  }
}

export default adminAddSite