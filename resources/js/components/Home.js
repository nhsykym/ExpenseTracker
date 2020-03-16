import React from 'react';
import { Link } from 'react-router-dom';
import Table from './Table';
import BarChart from './BarChart';


const Home = () => {
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
                    <Table header="最近の収支" limit="5"/>
                </div>
            </div>
        </div>
  );
};

export default Home;
