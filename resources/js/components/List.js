import React, { useState, useEffect} from 'react';
import RenderRows from './RenderRows';
import axios from 'axios';

const List = () => {
    
    const [expenses, setExpenses] = useState([]);
    
    const updateList = (res) => {
        setExpenses(res.data);
    };
        
    useEffect(() => {
            axios
                .get('/api/get')
                .then((res) => {
                    //expensesを更新（描画がかかる）
                    setExpenses(res.data);
                    })
                .catch(error => {
                    console.log(error);
                });
    }, []);
    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card mt-3">
                        <div className="card-header">収支の一覧
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>日付</td><td>メモ</td><td>金額</td><td>編集</td><td>削除</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* 行の描画 */}
                                    <RenderRows
                                        expenses={expenses} updateList={updateList}
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
};


export default List;
