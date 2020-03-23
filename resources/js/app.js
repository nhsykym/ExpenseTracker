import React from 'react';
import ReactDOM from 'react-dom';
import CSSBaseline from '@material-ui/core/CssBaseline';

import Default from './components/Default';

const App = () => {
    return (
        <React.Fragment>
            <CSSBaseline />
            <Default />
        </React.Fragment>
    );
    
};

ReactDOM.render(<App />, document.getElementById('app'));