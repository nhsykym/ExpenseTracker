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
        const token = props.token;
        axios
            .get('/api/get', {
                header: {'Authorization': 'Bearer ' + token}
            })
            .then((res) => {
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
                    <Filter updateTable={updateTable}/>
                    <Table header="収支の一覧" expenses={expenses} updateTable={updateTable}/>
                </div>
            </div>
        </div>
    );
};


export default List;
