import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = (props) => {
    const classes = useStyles();
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit">
                    <Link to="/">Home</Link>
                </Button>
                <Button color="inherit">
                    <Link to="/list">List</Link>
                </Button>
                <Button color="inherit">
                    <Link to="/create">+ 新規追加</Link>
                </Button>
                    
                {props.isAuthenticated ?
                    <Button color="inherit">
                        <Link to="/signin" onClick={props.logout}>Logout</Link>
                    </Button>
                :
                    <Button color="inherit">
                        <Link to="/signin">Login</Link>
                    </Button>
                }
                {/* <h2>{props.user}</h2> */}
            </Toolbar>
        </AppBar>
  );
};

export default Header;
