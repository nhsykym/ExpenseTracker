import React from 'react';
import { Link } from 'react-router-dom';
import Table from './Table';

const Home = () => {
  return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card mt-3">
                        <div className="card-header">Dashboard</div>
                        <div className="card-body">
                            図
                        </div>
                    </div>
                    <Table header="最近の収支" limit="5"/>
                </div>
            </div>
        </div>
  );
};

export default Home;
