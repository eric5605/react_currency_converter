import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import './index.css'

var historicalRates = [109.0462402387, 107.6929855481, 108.0417434009, 108.2568807339, 108.7937062937, 108.8607594937, 108.1057650629, 108.3065984566, 108.0753466469, 108.5609243697, 108.7979629467, 108.7662337662, 109.4369408876, 109.663791586, 109.4327990136, 109.7035277558, 109.7169561767, 109.9242023621, 109.4237169382, 109.4641919103, 109.4408959664];

var dates = ["2019-01-02", "2019-01-03", "2019-01-04", "2019-01-07", "2019-01-08", "2019-01-09", "2019-01-10", "2019-01-11", "2019-01-14", "2019-01-15", "2019-01-16", "2019-01-17", "2019-01-18", "2019-01-21", "2019-01-22", "2019-01-23", "2019-01-24", "2019-01-25", "2019-01-28", "2019-01-29", "2019-01-30"]
//
const api2 = 'https://alt-exchange-rate.herokuapp.com/history?start_at=2019-01-01&end_at=2019-01-30&base=USD&symbols=CAD'
// -----------------------------------------------
//
// function GetData() {
// const [rates, setRates] = useState([]);
//
//     useEffect(() => {
//       loadData();
//     }, []);
//
//
//     const loadData = async () => {
//       const response = await fetch(api2);
//       const data = await response.json();
//       setRates(data.rates);
//       // console.log(Object.keys(data));
//     }
// }


// CurrencyChart
class CurrencyChartData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      historicalData: [],
      dates: [],
      exchangeRates: [],
    };
  }


  componentDidMount() {
    const api2 = 'https://alt-exchange-rate.herokuapp.com/history?start_at=2019-01-01&end_at=2019-01-30&base=USD&symbols=JPY'

    fetch(api2)
     .then(results => {
        return results.json();
    }).then(data => this.setState({
      historicalData: data['rates'],
      dates: Object.keys(data['rates']),
    }));

  }

  render() {
    const { dates, historicalData, exchangeRates } = this.state;

    if (!historicalData) {
      return null;
    }
// console.log(getData())
  // create array with historical exchange rates
    const pastPrices = (Object.values(historicalData))
    // const exchangeRates = []
    for (let i = 0; i < pastPrices.length; i++) {
      const element = pastPrices[i];
      for (const property in element) {
        exchangeRates.push(element[property])

       }
       // console.log(exchangeRates)
       // console.log(dates)
     }

    return (

      <div className="CurrencyChart text-center py-5">
        <div className="main chart-wrapper">
          <LineChart
          data={this.state.data[0].data}
          title={this.state.data[0].title}
          color="#3E517A"

          />
        </div>
      </div>
    );
  }
}

export default function LineChart() {
  // GetData();

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
