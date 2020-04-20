import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'
import NavigationBar from '../../navbar/NavigationBar.js'
import {withCookies, Cookies} from 'react-cookie';
import {instanceOf} from 'prop-types';


class adminAddSite extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };
  get_cookie () {
    const {cookies} = this.props
    const token = cookies.get('token')
    console.log(token)
    return token
  }
  render () {
    return (
      <div>
        <NavigationBar />
        <h1>{this.get_cookie()}</h1>
        <h1>Adding a site</h1>
        <h1>{this.props.type}</h1>
      </div>
    )
  }
}

export default withCookies(adminAddSite);
