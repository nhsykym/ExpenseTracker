import React, { useState, useEffect } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

const BarChart = (props) => {
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
      // .catch(error => {
      //   console.log(error);
      //   const status = error.response.status;
      //   if (status === 401 && props.isAuthenticated) {
      //       props.refresh();
      //   }});
      
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
  
  
  return (
    <React.Fragment>
        <h2>支出の推移</h2>
        <Bar data={chartData} height={100} />
    </React.Fragment>
  );
};

export default BarChart;