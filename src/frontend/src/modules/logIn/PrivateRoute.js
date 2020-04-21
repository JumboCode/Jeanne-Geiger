import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa.js";
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect, getTokenSilently} = useAuth0();
  const [cookies, setCookie] = useCookies();

  console.log(isAuthenticated)

  useEffect(() => {
    if (loading) {
      return;
    }
    if (isAuthenticated) {
      getTokenSilently().then((token) => {
        setCookie('token', token, {path: '/'});
      });
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
