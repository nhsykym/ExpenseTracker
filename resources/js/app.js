import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Default from './components/Default';
// import Create from './components/Create';
// import List from './components/List';
// import Edit from './components/Edit';

const App = () => {
    return (
        <BrowserRouter>
                <Switch>
                    {/* <Route exact path="/login" component={Login} /> */}
                    <Route path="/" component={Default} />
                </Switch>
            </BrowserRouter>
    );
    
};

ReactDOM.render(<App />, document.getElementById('app'));