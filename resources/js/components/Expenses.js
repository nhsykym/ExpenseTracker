import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RenderRows from './RenderRows';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

const Expenses = (props) => {
    return (
        <React.Fragment>
          <Title>最近の支出</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>日付</TableCell>
                <TableCell>摘要</TableCell>
                <TableCell>金額</TableCell>
                <TableCell>カテゴリ</TableCell>
                <TableCell>編集</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <RenderRows
                    expenses={props.expenses} updateTable={props.updateTable}
                />
            </TableBody>
          </Table>
        </React.Fragment>
    );
};


export default Expenses;
