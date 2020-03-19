import React, { useState, useEffect } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import RenderOptions from './RenderOptions';


const Create = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleInputChange = (e) => {
    switch(e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };
  
  const handleSubmit = () => {
    if({name} == '' && {email} == '' && {password} == ''){
      return;
    }
    
    const data = {
      name: name,
      email: email,
      password: password
    };
    axios
      .post('/api/signup', data)
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
                        <div className="card-header">SignUp
                        </div>
                        <div className="card-body">
                            <div className="w-50">
                                <div className="form-group">
                                  <label>名前:</label>
                                  <input type="text" name="name" value={name} className="form-control" onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                  <label>email:</label>
                                  <input type="text" name="email" value={email} className="form-control" onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                  <label>パスワード:</label>
                                  <input type="text" name="password" value={password} className="form-control" onChange={handleInputChange} />
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