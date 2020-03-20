import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import RenderOptions from './RenderOptions';


const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleInputChange = (e) => {
    switch(e.target.name) {
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
    if({email} == '' && {password} == ''){
      return;
    }
    
    const data = {
      email: email,
      password: password
    };
    axios
      .post('/api/signin', data)
      .then(res => {
        const token = res.data.token;
        props.authenticate(token);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  return (
    <React.Fragment>
      {
        (() => {
          if (props.isAuthenticated && props.location.state !== undefined) {
            return (
              <Redirect to={props.location.state.from} />
            );
          } else {
            return (
              <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card mt-3">
                            <div className="card-header">SignIn
                            </div>
                            <div className="card-body w-50">
                              <div className="form-group">
                                <label>email:</label>
                                <input type="email" name="email" value={email} className="form-control" onChange={handleInputChange} />
                              </div>
                              <div className="form-group">
                                <label>パスワード:</label>
                                <input type="text" name="password" value={password} className="form-control" onChange={handleInputChange} />
                              </div>
                              <div>
                                <button className="btn btn-primary" onClick={handleSubmit}>Login</button> 
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            );
          }
        })()
      }
    </React.Fragment>
  );
};

export default SignIn;