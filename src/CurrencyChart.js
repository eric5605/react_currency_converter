import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import './index.css'
// import Currencies from "./Currencies"

const CurrencyChart = (props) => {
  console.log(props.pastDates)
  console.log(props.historicExchangeRates)

  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: props.pastDates,
        datasets: [
          {
            label: "Currency Exchange Chart",
            data: props.historicExchangeRates,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: false,
            lineTension: 0
          }
        ]
       }
    });
  });

  return (
     <div className="container py-5">
       <canvas id="myChart" width="200" height="100" />
       <h2> {props.message} </h2>
     </div>
  );
}

export default CurrencyChart
