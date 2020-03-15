import React from 'react';
import { Link } from 'react-router-dom';

const Default = () => {
  return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card mt-3">
                        <div className="card-header">Dashboard</div>
                        <div className="card-body">
                            図
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header">最近の支出
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>日付</td><td>メモ</td><td>金額</td><td>編集</td><td>削除</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>タスクがでる</td>
                                        <td>300円</td>
                                        <td><button className="btn btn-primary"><Link style={styles.Link} to="/edit">編集</Link></button></td>
                                        <td><button className="btn btn-danger">削除</button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>タスクがでる</td>
                                        <td>300円</td>
                                        <td><button className="btn btn-primary"><Link style={styles.Link} to="/edit">編集</Link></button></td>
                                        <td><button className="btn btn-danger">削除</button></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>タスクがでる</td>
                                        <td>300円</td>
                                        <td><button className="btn btn-primary"><Link style={styles.Link} to="/edit">編集</Link></button></td>
                                        <td><button className="btn btn-danger">削除</button></td>
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

const styles = {
    Link: {
        color: "#fff",
    }
};

export default Default;
