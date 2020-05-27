import React from 'react'
import './styles.css'
import NavigationBar from '../navbar/NavigationBar.js'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class notFound extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };
    render () {
      return (
        <div>
          <NavigationBar />
          Sorry, the page you're looking for does not exist.
        </div>
      )
    }
  }
  
  export default withCookies(notFound)
  