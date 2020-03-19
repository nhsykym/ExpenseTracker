import React, { useState, useEffect }from 'react';
import RenderOptions from './RenderOptions';
import axios from 'axios';

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
  
  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  const handleMonthChange = (event) => {
    const inputMonth = event.target.value;
    setYearMonth(inputMonth);
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  const handleMoneyFromChange = (event) => {
    setMoneyFrom(event.target.value);
  };
  
  const handleMoneyToChange = (event) => {
    setMoneyTo(event.target.value);
  };
  
  const handleSubmit = () => {
    const data = {
      yearMonth: yearMonth,
      category: selectedCategory,
      moneyFrom: moneyFrom,
      moneyTo: moneyTo
    };
    
    axios
      .get('/api/getFiltered', {
        params: data
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
                    <RenderOptions categories={categories}/>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>金額:</label>
                <div className="mx-2">
                  <input type="text" value={moneyFrom} onChange={handleMoneyFromChange} className="form-control form-inline" />
                  ~
                  <input type="text" value={moneyTo} onChange={handleMoneyToChange} className="form-control form-inline" />
                </div>
              </div>
            </form>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>絞り込み</button>
          </div>
      </div>
    );
};


export default Filter;
