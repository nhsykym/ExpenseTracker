import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const RenderRows = (props) => {
    const handleDelete = (e) => {
        axios
            .post('/api/delete', {
                id: e.target.name
            })
            .then(res => {
                props.updateTable(res.data);
                console.log('deleted');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return props.expenses.map(expense => {
        return (
            <tr key={expense.id}>
                <td>{expense.purchased_at}</td>
                <td>{expense.title}</td>
                <td>{expense.money}</td>
                <td><button className="btn btn-primary"><Link style={styles.Link} to={'/edit/' + expense.id}>編集</Link></button></td>
                <td><button className="btn btn-danger" name={expense.id} onClick={handleDelete}>削除</button></td>
            </tr>
        );
    });
};

const styles = {
    Link: {
        color: "#fff",
    }
};


export default withRouter(RenderRows);