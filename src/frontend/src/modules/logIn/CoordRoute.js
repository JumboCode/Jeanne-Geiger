import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa.js";
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';


const CoordRoute = ({ component: Component, path, ...rest }) => {
  const { roles, setRoles, user, loading, isAuthenticated, loginWithRedirect, getTokenSilently } = useAuth0();
  const [cookies, setCookie] = useCookies();
  console.log(isAuthenticated)

  useEffect(() => {
    if (loading) {
      return;
    }
    if (isAuthenticated) {
      setRoles(user['https://jeanne-geiger-api//roles'])
      console.log(roles)
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
  }, [loading, isAuthenticated, loginWithRedirect, path, roles]);

//   if (isAuthenticated) {
//     roles = user['https://jeanne-geiger-api//roles']
//   }  && 'Coordinator' in roles
  console.log(roles)
  const render = props =>
    (isAuthenticated === true && roles && roles.includes('Coordinator')) ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default CoordRoute;