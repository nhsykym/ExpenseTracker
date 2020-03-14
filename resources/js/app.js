require('./bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import Create from './components/Create';
import List from './components/List';
import Edit from './components/Edit';

ReactDOM.render(
    <Router>
         <div className="container">
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="/">ToDoList</a>
                </div>
                <ul className="nav navbar-nav">
                  <li className="active"><a href="#">Home</a></li>
                  <li><Link to="/create">Create</Link></li>
                  <li><Link to="/list">List</Link></li>
                </ul>
              </div>
            </nav>
            
            <Switch>
                <Route path="/create">
                    <Create />
                </Route>
                <Route path="/list">
                    <List />
                </Route>
                <Route path="/todos/:id/edit">
                    <Edit />
                </Route>
            </Switch>
        </div>
    </Router>,
    
    document.getElementById('example')
);

