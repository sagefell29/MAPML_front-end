import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const ChartComponent = ({ y_test, pred, title }) => {
  const minVal = Math.min(...y_test, ...pred);
  const maxVal = Math.max(...y_test, ...pred);

  const data = y_test.map((value, index) => ({ x: value, y: pred[index] }));

  const chartData = {
    datasets: [
      {
        label: "Actual vs Predicted",
        data: data,
        showLine: false,
        pointRadius: 4,
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Regression Line",
        data: [
          { x: minVal, y: minVal },
          { x: maxVal, y: maxVal },
        ],
        showLine: true,
        borderColor: "rgba(255, 0, 0, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Actual Values",
        },
      },
      y: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Predicted Values",
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `R-Squared chart for ${title}`,
      },
    },
  };

  return <Scatter data={chartData} options={options} id={`chart-${title}`}/>;
};

export default ChartComponent;