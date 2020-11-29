import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import './index.css'


var historicalRates = [709.0462402387, 707.6929855487, 708.0477434009, 708.2568807339, 708.7937062937, 708.8607594937, 708.7057650629, 708.3065984566, 708.0753466469, 708.5609243697, 708.7979629467, 708.7662337662, 709.4369408876, 709.663797586, 709.4327990736, 709.7035277558, 709.7769567767, 709.9242023627, 709.4237769382, 709.4647979703, 709.4408959664];

var dates2 = ["1972-01-02", "1972-01-03", "1972-01-04", "1972-01-07", "1972-01-08", "1972-01-09", "1972-01-10", "1972-01-11", "1972-01-14", "1972-01-15", "1972-01-16", "1972-01-17", "1972-01-18", "1972-01-21", "1972-01-22", "1972-01-23", "1972-01-24", "1972-01-25", "1972-01-28", "1972-01-29", "1972-01-30"]

const LineChart = (props) => {
    const { dates } = props;
    console.log(dates)
  useEffect(() => {

    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates2,
        datasets: [
          {
            label: "Currency Exchange Chart",
            data: historicalRates,
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
     </div>
  );
}

export default LineChart
