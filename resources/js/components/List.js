import React, { useState, useEffect} from 'react';
import RenderRows from './RenderRows';
import axios from 'axios';
import Table from './Table';
import Filter from './Filter';

const List = (props) => {
    const [expenses, setExpenses] = useState([]);

    const updateTable = (result) => {
        setExpenses(result);
    };

    useEffect(() => {
        axios
            .get('/api/get', {
                headers: { 'Authorization': 'Bearer ' + props.token }})
            .then((res) => {
                setExpenses(res.data);
                })
            .catch(error => {
                const status = error.response.status;
                if (status === 401 && props.isAuthenticated) {
                    props.refresh();
                }
            });
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <Filter token={props.token} isAuthenticated={props.isAuthenticated} refresh={props.refresh} updateTable={updateTable}/>
                    <Table header="収支の一覧" expenses={expenses} updateTable={updateTable}/>
                </div>
            </div>
        </div>
    );
};


export default List;
