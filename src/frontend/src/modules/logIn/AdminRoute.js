import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '../../react-auth0-spa.js'
import { useCookies } from 'react-cookie'

const AdminRoute = ({ component: Component, path, ...rest }) => {
  const { roles, user, loading, isAuthenticated, loginWithRedirect, getTokenSilently } = useAuth0()
  const [cookies, setCookie] = useCookies()

  useEffect(() => {
    if (loading) {
      return
    }
    if (isAuthenticated) {
      getTokenSilently().then((token) => {
        setCookie('token', token, { path: '/' })
      })
      return
    }

    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      })
    }
    fn()
  }, [getTokenSilently, setCookie, user, loading, isAuthenticated, loginWithRedirect, path, roles])

  const render = props =>
    (loading
      ? null : (!isAuthenticated)
        ? <Redirect to='/'/> : (roles.includes('DVHRT_ADMIN')
          ? <Component {...props} /> : (roles.includes('Coordinator')
            ? <Redirect to='/site/'/> : <Redirect to='/'/>)))

  return <Route path={path} render={render} {...rest} />
}

export default AdminRoute
