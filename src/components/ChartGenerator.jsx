import React from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js/auto";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartGenerator = ({ chartData, stageTwoLen, setActiveStage, setActivePoint }) => {
  const data = {
    labels: chartData,
    datasets: [
      {
        data: chartData,
        fill: false,
        backgroundColor: "transparent",
        borderColor: "rgb(255, 230, 118)",
        lineTension: 0.5,
        pointRadius: 10,
        pointBorderWidth: 5,
        pointBorderColor: "rgb(255, 255,255)",
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: "black",
        pointHoverRadius: 10,
      
      },
    ],
  };
  return (
    <Line
      data={data}
      plugins={[ChartDataLabels]}
      options={{
        interaction: {
          intersect: true,
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
          },
          x: {
            display: false,
          },
        },

        labels: {
          display: false,
        },
        plugins: {
          datalabels: {
            align: "top",
            anchor: "end",
            formatter: function (value) {
              return value;
            },
          },
          legend: {
            display: false,
            labels: {
              color: "rgb(255, 99, 132)",
            },
          },
        },
        onClick: (event, elements) => {
          if (elements && elements.length > 0) {
            const clickedIndex = elements[0].index;

            if (clickedIndex === 0) {
              setActiveStage(1);
              setActivePoint(0);
            }
            if (clickedIndex >= 1 && clickedIndex <= stageTwoLen) {
              setActiveStage(2);
              setActivePoint(clickedIndex - 1);
            }
            if (clickedIndex > stageTwoLen) {
              setActiveStage(3);
              setActivePoint(clickedIndex - stageTwoLen - 1);
            }
          }
        },
      }}
    />
  );
};

export default ChartGenerator;
