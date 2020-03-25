import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { axios } from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Home from './Home';
import Dashboard from './Dashboard';
import Create from './Create';
import Edit from './Edit';
import List from './List';
import SignUp from './SignUp';
import SignIn from './SignIn';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 260,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  datePickerMargin: {
    margin: theme.spacing(1),
  },
}));

const Default = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState('');
  
  const authenticate = (token) => {
    setIsAuthenticated(true);
    setToken(token);
    localStorage.setItem('jwt', token);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('jwt');
  };
  
  useEffect(() => {
    const lsToken = localStorage.getItem('jwt');
    if (lsToken) {
        authenticate(lsToken);
    }
  },[]);
  
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
      <Header isAuthenticated={isAuthenticated} user={user} logout={logout}/>
      <Switch>
        {/* 未ログインでもアクセス可能 */}
        <Route exact path="/" render={
          (props) => <Home useStyles={useStyles} {...props}/> }  />
        <Route path="/signin" render={
          (props) => <SignIn authenticate={authenticate} isAuthenticated={isAuthenticated} setUser={setUser} {...props} />} />
        <Route path="/signup" component={SignUp} />
        
        {/* ログイン時のみアクセス可能 */}
        <PrivateRoute exact path='/dashboard' component={Dashboard} isAuthenticated={isAuthenticated} token={token} authenticate={authenticate} useStyles={useStyles} />
        <PrivateRoute path="/list" component={List} isAuthenticated={isAuthenticated} token={token} authenticate={authenticate} useStyles={useStyles} />
        <PrivateRoute path="/create" component={Create} isAuthenticated={isAuthenticated} token={token} useStyles={useStyles} />
        <PrivateRoute path="/edit/:id" component={Edit} isAuthenticated={isAuthenticated} token={token} useStyles={useStyles} />
      </Switch>
    </BrowserRouter>
  );
};

export default Default;
