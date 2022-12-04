import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRouteAuth = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() => props.loggedIn ? <Redirect to='/' /> : <Component {...props} />}
    </Route>
  );
}

export default ProtectedRouteAuth;
