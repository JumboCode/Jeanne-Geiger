import React from 'react'
import './styles.css'
import NavigationBar from '../navbar/NavigationBar.js'
import { withCookies, Cookies } from 'react-cookie'
import { instanceOf } from 'prop-types'

class notFound extends React.Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    render () {
      return (
        <div>
          <NavigationBar />
          <div className="not_found">
            <div className="error-404">404</div>
            <div>Sorry, the page you are looking for does not exist.</div>
            <a href='/'>
              <div className="back_home_button">Back to Home</div>
            </a>
          </div>
        </div>
      )
    }
}

export default withCookies(notFound)
