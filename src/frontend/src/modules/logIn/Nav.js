import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  let logged_out_nav;
  if (props.type == 'login'){
    logged_out_nav = (
      <ul>
        <li onClick={() => props.display_form('login')}>login</li>
      </ul>
    );
  }else{
    logged_out_nav = (
      <ul>
        <li onClick={() => props.display_form('signup')}>signup</li>
      </ul>
    );
  }


  const logged_in_nav = (
    <ul>
      <li onClick={props.handle_logout}>logout</li>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
