import React, { Component } from 'react'
import { ReactComponent as Logo } from './logo.svg'
import { ReactComponent as Settings } from './SettingsIcon.svg'
import './NavigationBar.css'
//
// class NavigationBarItem extends Component {
//     render() {
//
//         const c = this.props.float;
//         const c2 = "NavigationBarItemContainer " + c;
//
//         return (
//             <div className={c2}>
//                 <a href={this.props.link} className="NavigationBarItemAnchor">
//                     <div className="NavigationBarItemText">{this.props.text}</div>
//                 </a>
//             </div>
//         );
//     }
// }
/*
 * Replace /site and /admin with window.location.hostname/site and .../admin
 *
*/
class NavigationBar extends Component {
  logoClick () {
    var path = window.location.pathname
    var host = window.location.hostname
    if (path.slice(1, 5) === 'site') {
      window.location.replace('/site')
    } else {
      window.location.replace('/admin')
    }
  }

  logout () {
    window.location.replace('/')
  }

  render () {
    return (
      <div className="NavigationBarContainer">
        <Logo class="LogoWrapper" width="17%" onClick={(e) => this.logoClick(e)}/>
        <button id="logout" onClick={(e) => this.logout(e)}>Logout</button>
      </div>
    )
  }
}

export default NavigationBar
