// src/modules/auth0button.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";

const auth0buttons = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className='auth0button'>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default auth0buttons;