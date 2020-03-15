import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Create from './Create';
import Edit from './Edit';
import List from './List';

const Default = () => {
  return (
    <div>
        <Header />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit" component={Edit} />
            <Route path="/list" component={List} />
            {/* <Route path="/service" component={Service} /> */}
        </Switch>
    </div>
  );
};

export default Default;
