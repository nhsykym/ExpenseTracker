import React, { useState, useEffect }from 'react';
import RenderOptions from './RenderOptions';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const Filter = (props) => {
  //年月をyyyy-mm形式で取得
  const getThisMonth = () => {
    const now = new Date();
    const thisYear = now.getFullYear();
    const thisMonth = ("0"+(now.getMonth()+1)).slice(-2);
    return thisYear + "-" + thisMonth;
  };
  
  const [yearMonth, setYearMonth] = useState(getThisMonth());
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [moneyFrom, setMoneyFrom] = useState('');
  const [moneyTo, setMoneyTo] = useState('');
  const [money, setMoney] = useState({min: '1', max: ''});
  const [error, setError] = useState('');
  
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
  
  const handleMonthChange = (event) => {
    const inputMonth = event.target.value;
    setYearMonth(inputMonth);
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
 
  return (
      <div className="card mt-3">
          <div className="card-header">フィルター
          </div>
          <div className="card-body d-flex">
            <form className="form-inline">
              <div className="form-group">
                <label>日付:</label>
                <div className="mx-2">
                  <input type="month" id="purchased_at" value={yearMonth} onChange={handleMonthChange} className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label>カテゴリ: </label>
                <div className="mx-2">
                  <select className="form-control" valule={selectedCategory} onChange={handleCategoryChange}>
                    <option value="default">未選択</option>
                    <RenderOptions categories={categories}/>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>金額:</label>
                <div className="mx-2">
                  <input type="text" name="min" value={money.min} onChange={handleMoneyChange} className="form-control form-inline" />
                  ~
                  <input type="text" name="max" value={money.from} onChange={handleMoneyChange} className="form-control form-inline" />
                </div>
              </div>
            </form>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              検索
            </Button>
            { error !== '' ? <p>{error}</p> : ''}
          </div>
      </div>
    );
};


export default Filter;
