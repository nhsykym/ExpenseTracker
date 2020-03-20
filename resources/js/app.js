import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Default from './components/Default';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Default} />
            </Switch>
        </BrowserRouter>
    );
    
};

ReactDOM.render(<App />, document.getElementById('app'));