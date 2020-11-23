import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import './index.css'

export default function CurrencyChart() {
  // GetData();
  const api2 = 'https://alt-exchange-rate.herokuapp.com/history?start_at=2019-01-01&end_at=2019-01-30&base=USD&symbols=JPY'
  // const [rates, setRates] = useState([]);
  const [exchangeData, setExchangeData] = useState([]);
  const [dates, setDates] = useState([]);

    useEffect(() => {
      loadData();
    }, []);

    const loadData = async () => {
      const response = await fetch(api2);
      const data = await response.json();
      // setRates(data.rates);
      setDates(Object.keys(data.rates))
      setExchangeData(data.rates);
    }
    const pastPrices = (Object.values(exchangeData))
    const historicalRates = [];

    for (let i = 0; i < pastPrices.length; i++) {
      const element = pastPrices[i];
      for (const property in element) {
        historicalRates.push(element[property])
       }
     }
    console.log(historicalRates)

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
     <div className="container py-5">
       <canvas id="myChart" width="200" height="100" />
     </div>
  );
}

// export default CurrencyChart
