import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAuth } from './contexts/auth'

function PrivateRoute ({ component: Component, ...rest }) {
  const isLogin = useAuth()

  return (
    <Route {...rest} render={props => (
      isLogin
        ? <Component {...props} />
        : <Redirect to="/" />
    )} />
  )
}

export default PrivateRoute
