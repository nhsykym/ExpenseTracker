import React from 'react';
import { Link } from 'react-router-dom';

//RenderRowsの機能実装
const RenderRows = (props) => {
    // mapでループしている（for相当）
    return props.expenses.map(expense => {
        return (
            <tr key={expense.id}>
                <td>{expense.id}</td>
                <td>{expense.title}</td>
                <td>{expense.money}</td>
                <td><button className="btn btn-primary"><Link style={styles.Link} to="/edit">編集</Link></button></td>
                <td><button className="btn btn-danger">削除</button></td>
            </tr>
            
        );
    });
};

const styles = {
    Link: {
        color: "#fff",
    }
};


export default RenderRows;