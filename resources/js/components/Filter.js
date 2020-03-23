import React, { useState, useEffect }from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ja from 'date-fns/locale/ja';
import Title from './Title';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const Filter = (props) => {
  //年月をyyyy-mm形式で取得
  const getThisMonth = () => {
    const now = new Date();
    const thisYear = now.getFullYear();
    const thisMonth = ("0"+(now.getMonth()+1)).slice(-2);
    return thisYear + "-" + thisMonth;
  };
  
  const [yearMonth, setYearMonth] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [moneyFrom, setMoneyFrom] = useState('');
  const [moneyTo, setMoneyTo] = useState('');
  const [money, setMoney] = useState({min: '', max: ''});
  const [error, setError] = useState('');
  
  const classes = useStyles();
  
  useEffect(() => {
    const token = props.token;
    axios
      .get("/api/usedCategories", {
        headers: { 'Authorization': 'Bearer ' + token }})
      .then((res) => {
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
  
  useEffect(() => {
    if (money.min > money.max && money.max !== '') {
      setError('金額が不正です');
    } else {
      setError('');
    }
  });
  
  const handleMonthChange = date => {
    console.log(date);
    setYearMonth(date);
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  const handleMoneyChange = (event) => {
    switch (event.target.name) {
      case 'min':
        setMoney({...money, min: event.target.value});
        break;
      case 'max':
        setMoney({...money, max: event.target.value});
        break;
    }
  };
 
  
  const handleSubmit = () => {
    const data = {
      yearMonth: yearMonth,
      category: selectedCategory,
      moneyFrom: money.min,
      moneyTo: money.max
    };
    
    const token = props.token;
    axios
      .get('/api/getFiltered', {
        params: data,
        headers: {'Authorization': 'Bearer ' + token}
      })
      .then(res => {
        props.updateTable(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const renderOptions = () => {
    return categories.map((category, index) => {
      return <MenuItem key={index} value={category.id}>{category.name}</MenuItem>;
    });
  };
 
  return (
      <React.Fragment>
          <Title>絞り込み</Title>
          <Grid container justify="space-around">
            {/* 日付 */}
            <Grid item xs={12} sm={3}>
              <FormControl className={classes.formControl}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
                  <DatePicker
                    views={["year", "month"]}
                    label="年月"
                    format="yyyy年MM月"
                    value={yearMonth}
                    onChange={handleMonthChange}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>
            {/* カテゴリ */}
            <Grid item xs={12} sm={2}>
              <FormControl className={classes.formControl}>
              <InputLabel id="category">カテゴリ</InputLabel>
              <Select
                labelId="category"
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                {renderOptions()}
              </Select>
            </FormControl>
            </Grid>
            {/* 金額 */}
            <Grid item xs={12} sm={2}>
              <FormControl className={classes.formControl}>
                <TextField id="standard-search" label="Min" name="min" value={money.min} onChange={handleMoneyChange} type="search" />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl className={classes.formControl}>
                <TextField id="standard-search" label="Max" name="max" value={money.from} onChange={handleMoneyChange} type="search" />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormControl className={classes.formControl}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  検索
                </Button>
                { error !== '' ? <p>{error}</p> : ''}
              </FormControl>
            </Grid>
          </Grid>
      </React.Fragment>
    );
};


export default Filter;
