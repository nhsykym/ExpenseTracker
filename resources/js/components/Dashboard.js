import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import BarChart from './BarChart';


const Dashboard= (props) => {
    const [expenses, setExpenses] = useState([]);
    
    const updateTable = (res) => {
        setExpenses(res.data);
    };
    
    useEffect(() => {
        const token = props.token;
        axios
            .get('/api/get', {
                headers: { 'Authorization': 'Bearer ' + token }})
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
                <div className="col-md-12">
                    <div className="card mt-3">
                        <div className="card-header">Overview</div>
                        <div className="card-body d-flex">
                            <div className="w-50">
                                <BarChart />
                            </div>
                            <div className="w-50">
                                <BarChart />
                            </div>
                        </div>
                    </div>
                    <Table header="最近の収支" expenses={expenses} updateTable={updateTable}/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
