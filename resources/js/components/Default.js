import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Create from './Create';
import Edit from './Edit';
import List from './List';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Default = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  
  const authenticate = (token) => {
    setIsAuthenticated(true);
    setToken(token);
  }
  
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
  }
  
  return (
    <React.Fragment>
        <Header isAuthenticated={isAuthenticated} logout={logout}/>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/signin" render={
                (props) => <SignIn authenticate={authenticate} isAuthenticated={isAuthenticated} {...props}/>} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Edit} />
              <Route path="/list" component={List} />
          </Switch>
    </React.Fragment>
  );
};

export default Default;
