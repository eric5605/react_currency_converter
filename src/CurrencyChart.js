import React, { useEffect } from "react";
import Chart from "chart.js";
import './index.css'

var historicalRates = [109.0462402387, 107.6929855481, 108.0417434009, 108.2568807339, 108.7937062937, 108.8607594937, 108.1057650629, 108.3065984566, 108.0753466469, 108.5609243697, 108.7979629467, 108.7662337662, 109.4369408876, 109.663791586, 109.4327990136, 109.7035277558, 109.7169561767, 109.9242023621, 109.4237169382, 109.4641919103, 109.4408959664];

var dates = ["2019-01-02", "2019-01-03", "2019-01-04", "2019-01-07", "2019-01-08", "2019-01-09", "2019-01-10", "2019-01-11", "2019-01-14", "2019-01-15", "2019-01-16", "2019-01-17", "2019-01-18", "2019-01-21", "2019-01-22", "2019-01-23", "2019-01-24", "2019-01-25", "2019-01-28", "2019-01-29", "2019-01-30"]

export default function CurrencyChart() {
  useEffect(() => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
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
     <div className="container">
       <canvas id="myChart" width="200" height="100" />
     </div>
  );
}
