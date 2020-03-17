import React from 'react';

const Filter = () => {
    return (
        <div className="card mt-3">
            <div className="card-header">フィルター
            </div>
            <div className="card-body d-flex">
              <form className="form-inline">
                <div class="form-group">
                  <label for="purchased_at">日付:</label>
                  <div className="mx-2">
                    <input type="date" id="purchased_at" class="form-control" />
                  </div>
                </div>
                <div class="form-group">
                  <label for="category">カテゴリ: </label>
                  <div className="mx-2">
                    <input type="text" id="category" class="form-control" />
                  </div>
                </div>
              </form>
              <button type="button" className="btn btn-primary">絞り込み</button>
            </div>
        </div>
    );
};


export default Filter;
