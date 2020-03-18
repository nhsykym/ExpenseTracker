import React, { useState, useEffect }from 'react';
import RenderOptions from './RenderOptions';
import axios from 'axios';

const Filter = () => {
  //年月をyyyy-mm形式で取得
  const getThisMonth = () => {
    const now = new Date();
    const thisYear = now.getFullYear();
    const thisMonth = ("0"+(now.getMonth()+1)).slice(-2);
    return thisYear + "-" + thisMonth;
  };
  
  const [yearMonth, setYearMonth] = useState(getThisMonth());
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('選択してください');
  
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
            </form>
            <button type="button" className="btn btn-primary">絞り込み</button>
          </div>
      </div>
    );
};


export default Filter;
