import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Expenses from './Expenses';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';
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
                {/* 折れ線グラフ */}
                <Grid item xs={12} md={8}>
                  <Paper className={fixedHeightPaper}>
                    {/* <div style={{height:200+"px"}}> */}
                      <LineChart refresh={props.refresh} isAuthenticated={props.isAuthenticated} token={props.token} />
                    {/* </div> */}
                  </Paper>
                </Grid>
                {/* カテゴリ比率 */}
                <Grid item xs={12} md={4}>
                  <Paper className={fixedHeightPaper}>
                    <DoughnutChart refresh={props.refresh} isAuthenticated={props.isAuthenticated} token={props.token} />
                  </Paper>
                </Grid>
                {/* 最近の出費 */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Expenses expenses={expenses} updateTable={updateTable}/>
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
