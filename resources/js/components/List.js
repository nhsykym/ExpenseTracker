import React, { useState, useEffect} from 'react';
import RenderRows from './RenderRows';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Expenses from './Expenses';
import Filter from './Filter';

const List = (props) => {
    const [expenses, setExpenses] = useState([]);
    const classes = props.useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const updateTable = (result) => {
        setExpenses(result);
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
                if (status === 401 && props.isAuthenticated) {
                    props.refresh();
                }
            });
    }, []);

    return (
        <React.Fragment>
        <main className={classes.content}>
            <Container maxWidth="md" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Filter token={props.token} isAuthenticated={props.isAuthenticated} refresh={props.refresh} updateTable={updateTable} useStyles={props.useStyles}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightPaper}>
                            <Expenses header="収支の一覧" expenses={expenses} updateTable={updateTable}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </main>
        </React.Fragment>
    );
};


export default List;
