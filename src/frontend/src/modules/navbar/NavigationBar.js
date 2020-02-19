import React, { Component } from 'react';
import { ReactComponent as Logo } from './logo.svg';
import { ReactComponent as Settings } from './SettingsIcon.svg';
import './NavigationBar.css';
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



class NavigationBar extends Component {
    render() {
        return (
            <div className="NavigationBarContainer">
                <Logo width="17%"/>
                <form>
                    <input type="text" name="name" className="NavSearchBar" placeholder=" Search"/>
                </form>
                <Settings className="settingsbutton"/>
            </div>
        );
    }
}

export default NavigationBar;
