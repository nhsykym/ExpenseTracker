import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import Title from './Title';

const LineChart = (props) => {
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
              label: "金額",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 99, 132, 0.6)"
              ],
            }
          ]
        }
      );
    });
  };
  
  const options= {
    maintainAspectRatio: false,
  };
  
  
  return (
    <React.Fragment>
      <Title>支出の推移</Title>
      <Line data={chartData} options={options} height={150}/>
    </React.Fragment>
  );
};

export default LineChart;