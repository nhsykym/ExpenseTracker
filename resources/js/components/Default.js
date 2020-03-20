import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Dashboard from './Dashboard';
import Create from './Create';
import Edit from './Edit';
import List from './List';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Default = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  
  const authenticate = (token) => {
    setIsAuthenticated(true);
    setToken(token);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };
  
  /* const PrivateRoute = ({component: Component, isAuthenticated, token, ...rest}) => (
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
  ); */
  const PrivateRoute = ({ component: Component, isAuthenticated, token, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props} {...rest} token={token} isAuthenticated={isAuthenticated} />
        ) : (
            <Redirect to={ {
                pathname: '/signin',
                state: { from: props.location }
            } } />
        )
    )} />
);
  
  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} logout={logout}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} isAuthenticated={isAuthenticated} token={token} />
        <Route path="/signin" render={
          (props) => <SignIn authenticate={authenticate} isAuthenticated={isAuthenticated} {...props} />} />
        {/* <Route path="/signup" component={SignUp} />
        <Route path="/list" component={List} />
        <Route path="/create" component={Create} />
        <Route path="/edit/:id" component={Edit} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Default;
