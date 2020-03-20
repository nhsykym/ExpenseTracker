import React, { useState, useEffect } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import RenderOptions from './RenderOptions';


const Create = (props) => {
  const [purchased_at, setPurchased_at] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const [money, setMoney] = useState('');
  
  const handleInputChange = (e) => {
    switch(e.target.name) {
      case 'purchased_at':
        setPurchased_at(e.target.value);
        break;
      case 'title':
        setTitle(e.target.value);
        break;
      case 'category':
        setCategory(e.target.value);
        break;
      case 'money':
        setMoney(e.target.value);
        break;
      default:
        break;
    }
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
    axios
      .post('/api/add', data)
      .then(res => {
        props.history.push("/list");
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card mt-3">
                        <div className="card-header">新規追加
                        </div>
                        <div className="card-body">
                            <div className="w-50">
                                <div className="form-group">
                                  <label>日付:</label>
                                  <input type="date" name="purchased_at" value={purchased_at} className="form-control" onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                  <label>メモ:</label>
                                  <input type="text" name="title" value={title} className="form-control" onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                  <label>カテゴリ:</label>
                                  <select name="category" valule={category} className="form-control" onChange={handleInputChange}>
                                    <RenderOptions categories={categories}/>
                                  </select>
                                </div>
                                <div className="form-group">
                                  <label>金額:</label>
                                  <input type="text" name="money" value={money} className="form-control" onChange={handleInputChange} />
                                </div>
                                <div>
                                  <button className="btn btn-primary" onClick={handleSubmit}>追加</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default withRouter(Create);