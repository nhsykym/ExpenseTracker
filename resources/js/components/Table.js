import React, { useState, useEffect} from 'react';
import RenderRows from './RenderRows';
import axios from 'axios';

const Table = (props) => {
    
    const [expenses, setExpenses] = useState([]);
    
    const updateTable = (res) => {
        setExpenses(res.data);
    };
        
    useEffect(() => {
        const limit = {limit: props.limit};
        axios
            .get('/api/get/', {params: limit})
            .then((res) => {
                //expensesを更新（描画がかかる）
                setExpenses(res.data);
                })
            .catch(error => {
                console.log(error);
            });
    }, []);
    
    return (
        <div className="card mt-3">
            <div className="card-header">{props.header}
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
                            expenses={expenses} updateTable={updateTable}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
    
};


export default Table;
