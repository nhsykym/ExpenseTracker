import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import Title from './Title';
import { brewer } from 'chartjs-plugin-colorschemes';

const DoughnutChart = (props) => {
  const [chartData, setChartData] = useState({});
  
  useEffect(() => {
    getChartData();
  }, []);
  
  const getChartData = () => {
    axios
      .get("/api/getChartData", {
                headers: { 'Authorization': 'Bearer ' + props.token }})
      .then(res => {
        const expenses = res.data;
        let labels = [];
        let data = [];
        expenses.forEach(expense => {
        labels.push(expense.purchased_at);
        data.push(expense.money);
      });
      
      setChartData({
          labels:labels,
          datasets: [
            {
              label: labels,
              data: data,
              fill: false,
            }
          ]
        }
      );
    });
  };
  
  const options = {
    maintainAspectRatio: false,
    plugin: {
      colorschemes: {
        scheme: 'brewr.Paired12'
      }
    }
  };
  
  return (
    <React.Fragment>
      <Title>カテゴリの分類</Title>
      <div style={{height: 200 + "px"}}>
        <Doughnut data={chartData} options={options}/>
      </div>
    </React.Fragment>
  );
};

export default DoughnutChart;