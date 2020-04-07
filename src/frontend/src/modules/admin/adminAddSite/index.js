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
    sources: []
  }

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

  handleRemove(index) {
    this.state.sources.splice(index, 1)
    this.setState({sources: this.state.sources})
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
              <TextInputObj title='Coordinator Name' id='coord_name'/>
              <TextInputObj title='Coordinator Email' id='coord_email'/>
            </Col>
            <Col>
              {
                this.state.sources.map((source, i) => {
                  return (
                    <div key={i}>
                      <TextInputObj class="referral" title={'Referral Source ' + (i + 1)} id={'referral_' + (i + 1)} />
                      <div class="buttons">
                        <button class="removeSource" onClick={(e)=>this.handleRemove(i)}><img class="logo" src={Remove} /></button>
                      </div>
                    </div>
                  )
                })
              }
              <div class="buttons">
                <button class="addSource" onClick={(e)=>this.addSource(e)}><img class="logo" src={Plus} /> Add another Referral Source</button>
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