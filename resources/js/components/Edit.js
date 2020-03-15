import React from 'react';

const Edit = () => {
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
                              <label for="text1">日付:</label>
                              <input type="text" id="text1" className="form-control"/>
                            </div>
                            <div className="form-group">
                              <label for="passwd1">メモ:</label>
                              <input type="password" id="passwd1" className="form-control"/>
                            </div>
                            <div className="form-group">
                              <label for="textarea1">金額:</label>
                              <input id="textarea1" className="form-control"/>
                            </div>
                            <div>
                              <button className="btn btn-primary">更新</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Edit;
