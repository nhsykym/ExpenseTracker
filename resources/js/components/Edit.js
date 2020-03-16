import React, { useState, useEffect } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';


const Edit = (props) => {
  const [purchased_at, setPurchased_at] = useState('');
  const [title, setTitle] = useState('');
  const [money, setMoney] = useState('');
  
  useEffect(() => {
    axios
        .get('/api/edit/' + props.match.params.id)
        .then((res) => {
            //expensesを更新（描画がかかる）
            setPurchased_at(res.data.purchased_at);
            setTitle(res.data.title);
            setMoney(res.data.money);
            })
        .catch(error => {
            console.log(error);
        });
    }, []);
  
  const handleInputChange = (e) => {
    switch(e.target.name) {
      case 'purchased_at':
        setPurchased_at(e.target.value);
        break;
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
  
  const handleSubmit = () => {
    if({purchased_at} == '' && {title} == '' && {money} == ''){
      return;
    }
    
    const data = {
      purchased_at: purchased_at,
      title: title,
      money: money
    };
    axios
      .patch('/api/edit/' + props.match.params.id, data)
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
                        <div className="card-header">編集
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
                                  <label>金額:</label>
                                  <input type="text" name="money" value={money} className="form-control" onChange={handleInputChange} />
                                </div>
                                <div>
                                  <button className="btn btn-primary" onClick={handleSubmit}>更新</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default withRouter(Edit);