import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';



const RenderRows = (props) => {
    const handleRowClick = (id) => {
        props.history.push('/edit/' + id);
    };
    
    return props.expenses.map(expense => {
        const trimed_purchased_at = expense.purchased_at.substring(5);
        return (
            <TableRow key={expense.id} onClick={() => handleRowClick(expense.id)}>
                {props.matches ? 
                    <React.Fragment>
                        <TableCell>{expense.purchased_at}</TableCell>
                        <TableCell>{expense.title}</TableCell>
                        <TableCell>&yen;{expense.money}</TableCell>
                        <TableCell>{expense.categoryname}</TableCell>
                        <TableCell align="center">
                            <Button color="primary">
                                <Link to={'/edit/' + expense.id}><EditIcon /></Link>
                            </Button>
                        </TableCell>
                    </React.Fragment>
                :
                    <React.Fragment>
                        <TableCell>{trimed_purchased_at}</TableCell>
                        <TableCell>{expense.title}</TableCell>
                        <TableCell>&yen;{expense.money}</TableCell>
                    </React.Fragment>
                }
            </TableRow>
        );
    });
};

export default withRouter(RenderRows);