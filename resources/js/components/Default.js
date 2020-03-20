import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import Dashboard from './Dashboard';
import Create from './Create';
import Edit from './Edit';
import List from './List';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Default = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [token, setToken] = useState(null);
  
  const authenticate = (token) => {
    setIsAuthenticated(true);
    setToken(token);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };
  
  const PrivateRoute = ({component: Component, isAuthenticated, token, ...rest}) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props} {...rest} token={token} isAuthenticated={isAuthenticated} />
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: {from: props.location}
        }}/>
      )
    ) }/>
  );
  
  return (
    <React.Fragment>
        <Header isAuthenticated={isAuthenticated} logout={logout}/>
        <PrivateRoute exact path='/list' component={List} isAuthenticated={isAuthenticated} token={token} />
        
        {isAuthenticated ? <Redirect to="/list"/> : ""}
        <Route exact path="/" component={Dashboard} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" render={
          (props) => <SignIn authenticate={authenticate} isAuthenticated={isAuthenticated} {...props} />} />
        <Route path="/create" component={Create} />
        <Route path="/edit/:id" component={Edit} />
    </React.Fragment>
  );
};

export default Default;
