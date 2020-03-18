import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from './Table';
import BarChart from './BarChart';


const Home = () => {
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
                <div className="col-md-12">
                    <div className="card mt-3">
                        <div className="card-header">Dashboard</div>
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

export default Home;
