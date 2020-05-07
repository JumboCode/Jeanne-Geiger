import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth0 } from '../../react-auth0-spa.js'
import { useCookies } from 'react-cookie'

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { user, loading, isAuthenticated, loginWithRedirect, getTokenSilently } = useAuth0()
  const [cookies, setCookie] = useCookies()

  console.log(isAuthenticated)
  console.log(user)

  useEffect(() => {
    if (loading) {
      return
    }
    if (isAuthenticated) {
      getTokenSilently().then((token) => {
        setCookie('token', token, { path: '/' })
        console.log('update token')
      })
      return
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      })
    }
    fn()
  }, [loading, isAuthenticated, loginWithRedirect, path])

  const render = props =>
    isAuthenticated === true ? <Component {...props} /> : null

  return <Route path={path} render={render} {...rest} />
}

export default PrivateRoute
