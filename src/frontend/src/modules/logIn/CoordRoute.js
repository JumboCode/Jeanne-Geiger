import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '../../react-auth0-spa.js'
import { useCookies } from 'react-cookie'

const CoordRoute = ({ component: Component, path, ...rest }) => {
  const { roles, user, loading, isAuthenticated, loginWithRedirect, getTokenSilently } = useAuth0()
    //eslint-disable-next-line
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
        ? <Redirect to='/'/> : (roles.includes('Coordinator')
          ? <Component {...props} /> : (roles.includes('DVHRT_ADMIN')
            ? <Redirect to='/admin/'/> : <Redirect to='/'/>)))

  return <Route path={path} render={render} {...rest} />
}

export default CoordRoute
