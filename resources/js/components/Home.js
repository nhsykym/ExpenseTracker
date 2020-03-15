import React from 'react';
import ReactDOM from 'react-dom';

// import Create from './components/Create';
// import List from './components/List';
// import Edit from './components/Edit';

const Home = () => {
  return (
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="card-header">Dashboard</div>
                    <div class="card-body">
                        図
                    </div>
                </div>
                <div class="card mt-3">
                    <div class="card-header">最近の支出
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <th>日付</th><th>メモ</th><th>金額</th><th>編集</th><th>削除</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>タスクがでる</td>
                                    <td>300円</td>
                                    <td><button class="btn btn-primary">編集</button></td>
                                    <td><button class="btn btn-danger">削除</button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>タスクがでる</td>
                                    <td>300円</td>
                                    <td><button class="btn btn-primary">編集</button></td>
                                    <td><button class="btn btn-danger">削除</button></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>タスクがでる</td>
                                    <td>300円</td>
                                    <td><button class="btn btn-primary">編集</button></td>
                                    <td><button class="btn btn-danger">削除</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Home;
