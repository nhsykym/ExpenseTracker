import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';


import Default from './components/Default';

const App = () => {
    return (
        <Default />
    );
    
};

ReactDOM.render(<App />, document.getElementById('app'));