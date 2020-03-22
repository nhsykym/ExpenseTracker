import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
            <TableRow key={expense.id}>
                <TableCell>{expense.purchased_at}</TableCell>
                <TableCell>{expense.title}</TableCell>
                <TableCell>{expense.money}</TableCell>
                <TableCell><button className="btn btn-primary"><Link style={styles.Link} to={'/edit/' + expense.id}>編集</Link></button></TableCell>
                <TableCell><button className="btn btn-danger" name={expense.id} onClick={handleDelete}>削除</button></TableCell>
            </TableRow>
        );
    });
};

const styles = {
    Link: {
        color: "#fff",
    }
};


export default withRouter(RenderRows);