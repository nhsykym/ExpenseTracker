import React, { useState, useEffect} from 'react';
import RenderRows from './RenderRows';
import axios from 'axios';

const Table = (props) => {
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
                        <RenderRows
                            expenses={props.expenses} updateTable={props.updateTable}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
    
};


export default Table;
