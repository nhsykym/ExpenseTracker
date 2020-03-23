import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const Home= (props) => {
  const classes = props.useStyles();
  
  return (
      <main className={classes.content}>
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.textAlignCenter}>
              <h1>さっそく使ってみよう</h1>
            </Grid>
          </Grid>
        </Container>
      </main>
    );
};

export default Home;
