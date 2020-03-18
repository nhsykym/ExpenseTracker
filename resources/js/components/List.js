import React, { useState, useEffect} from 'react';
import RenderRows from './RenderRows';
import axios from 'axios';
import Table from './Table';
import Filter from './Filter';

const List = () => {
    const [expenses, setExpenses] = useState([]);

    const updateTable = (res) => {
        setExpenses(res.data);
    };

    useEffect(() => {
        axios
            .get('/api/get')
            .then((res) => {
                setExpenses(res.data);
                console.log("get! " + res.data);
                })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <Filter />
                    <Table header="収支の一覧" expenses={expenses} updateTable={updateTable}/>
                </div>
            </div>
        </div>
    );
};


export default List;
