import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Create from './Create';
import Edit from './Edit';
import List from './List';
import SignUp from './SignUp';

const Default = () => {
  return (
    <React.Fragment>
        <Header />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={Edit} />
              <Route path="/list" component={List} />
              <Route path="/signup" component={SignUp} />
          </Switch>
    </React.Fragment>
  );
};

export default Default;
