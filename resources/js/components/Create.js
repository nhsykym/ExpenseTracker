import React, { useState, useEffect } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';
import ja from 'date-fns/locale/ja';
import Title from './Title';


const Create = (props) => {
  const [purchased_at, setPurchased_at] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [money, setMoney] = useState('');
  
  
  const handleInputChange = (e) => {
    switch(e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'money':
        setMoney(e.target.value);
        break;
      default:
        break;
    }
  };
  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  
  const handleDateChange = (date) => {
    setPurchased_at(formatDate(date));
  };
  
  const formatDate = (date) => {
    return format(date, 'yyyy-MM-dd');
  };
  
  
  useEffect(() => {
    const token = props.token;
    axios
      .get('/api/categories', {
        headers: {'Authorization': 'Bearer ' + token}
      })
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => {
        console.log(error);
        const status = error.response.status;
        if (status === 401 && props.isAuthenticated) {
            props.refresh();
        }
      });
  }, []);
  
  const handleSubmit = () => {
    if({purchased_at} == '' && {title} == '' && {money} == '' && {category} == ''){
      return;
    }
    const data = {
      purchased_at: purchased_at,
      title: title,
      category: category,
      money: money
    };
    const token = props.token;
    axios
      .post('/api/add', data,
      {headers: { 'Authorization': 'Bearer ' + token}})
      .then(res => {
        props.history.push("/list");
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const classes = props.useStyles();
  
  const renderOptions = () => {
    return categories.map((category, index) => {
      return <MenuItem key={index} value={category.id}>{category.name}</MenuItem>;
    });
  };
  
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="sm" className={classes.container}>
          <Paper className={classes.paper}>
            <Title>新規追加</Title>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box ml={1}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                  <DatePicker
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    label="年月を入力"
                    value={purchased_at}
                    onChange={handleDateChange}
                  />
                  </MuiPickersUtilsProvider>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="摘要"
                    value={title}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="category">カテゴリ</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    name="category"
                    value={category}
                    onChange={handleCategoryChange}
                  >
                   {renderOptions()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <TextField
                    required
                    id="money"
                    name="money"
                    label="金額"
                    fullWidth
                    value={money}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    追加
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default withRouter(Create);