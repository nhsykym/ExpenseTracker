import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Expenses from './Expenses';
import BarChart from './BarChart';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const Dashboard= (props) => {
    const [expenses, setExpenses] = useState([]);
    
    const updateTable = (res) => {
        setExpenses(res.data);
    };
    
    useEffect(() => {
        axios
            .get('/api/get', {
                headers: { 'Authorization': 'Bearer ' + props.token }})
            .then((res) => {
                setExpenses(res.data);
                })
            .catch(error => {
                const status = error.response.status;
                if (status === 401 && this.props.isAuthenticated) {
                    props.refresh();
                }
            });
    }, []);
    
    //style
    const classes = props.useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    
    
    return (
        <React.Fragment>
        <main className={classes.content}>
            <Container maxWidth="md" className={classes.container}>
              <Grid container spacing={3}>
                {/* Line Chart */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={classes.paper}>
                    <BarChart refresh={props.refresh} isAuthenticated={props.isAuthenticated} token={props.token}/>
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    aaa
                  </Paper>
                </Grid>
                {/* 最近の出費 */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Expenses header="最近の収支" expenses={expenses} updateTable={updateTable}/>
                  </Paper>
                </Grid>
              </Grid>
              {/* <Box pt={4}>
                <Copyright />
              </Box> */}
            </Container>
        </main>
        </React.Fragment>
    );
};

export default Dashboard;
