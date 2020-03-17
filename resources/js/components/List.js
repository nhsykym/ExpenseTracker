import React, { useState, useEffect} from 'react';
import RenderRows from './RenderRows';
import axios from 'axios';
import Table from './Table';
import Filter from './Filter';

const List = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <Filter />
                    <Table header="収支の一覧"/>
                </div>
            </div>
        </div>
    );
};


export default List;
