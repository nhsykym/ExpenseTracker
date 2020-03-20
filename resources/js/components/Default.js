import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { axios } from 'axios';

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
  
  const refresh = () => {
    return (
      axios.get('/api/refreshToken', {
          headers: { 'Authorization': 'Bearer ' + token }
      })
      .then((res) => {
          const token = res.data.token;
          authenticate(token);
      })
      .catch((error) => {
          console.log('Error!', error);
      })
    );
  };
  
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
        {/* 未ログインでもアクセス可能 */}
        <Route exact path="/" component={Home} />
        <Route path="/signin" render={
          (props) => <SignIn authenticate={authenticate} isAuthenticated={isAuthenticated} {...props} />} />
        <Route path="/signup" component={SignUp} />
        
        {/* ログイン時のみアクセス可能 */}
        <PrivateRoute exact path='/dashboard' component={Dashboard} isAuthenticated={isAuthenticated} token={token} refresh={refresh} />
        <PrivateRoute path="/list" component={List} isAuthenticated={isAuthenticated} token={token} refresh={refresh} />
        <PrivateRoute path="/create" component={Create} isAuthenticated={isAuthenticated} token={token} refresh={refresh} />
        <PrivateRoute path="/edit/:id" component={Edit} isAuthenticated={isAuthenticated} token={token} refresh={refresh} />
      </Switch>
    </BrowserRouter>
  );
};

export default Default;
