import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import './index.css'


const CurrencyChart = (props) => {
  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: props.pastDates,
        datasets: [
          {
            label: `${props.baseCurrency}/${props.compareCurrency}`,
            data: props.historicRates,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            fill: false,
            lineTension: 0
          }
        ]
       }
    });
  });

  return (
     <div className="container-fluid mx-auto">
       <canvas id="myChart"  width="300" height="200"/>
     </div>
  );
}

export default CurrencyChart
