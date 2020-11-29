import React from 'react'
import Chart from 'chart.js'
import './index.css'

Chart.defaults.global.defaultFontFamily = "Roboto, sans-serif";

// Data generation
function getRandomArray(numItems) {
  // Create random array of objects
  let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let data = [];
  for(var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random())
    });
  }
  // console.log(data);
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for(var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
    // console.log(data);
  return data;
}

function getData() {
  let data = [];

  data.push({
    title: 'Visits',
    data: getRandomDateArray(150)
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(20)
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(10)
  });

  data.push({
    title: 'Data 4',
    data: getRandomArray(6)
  });
  // console.log(data);

  return data;
}


// -----------------------------------------------

// LineChart
class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      historicalData: [],
      dates: [],
    }
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.time);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {

    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      options: {
			  maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'week'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.data.map(d => d.time),
        datasets: [{
          label: this.props.title,
          data: this.props.data.map(d => d.value),
          fill: 'none',
          backgroundColor: this.props.color,
          pointRadius: 2,
          borderColor: this.props.color,
          borderWidth: 1,
          lineTension: 0
        }]
      }
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

  // ---------------------------------------

// CurrencyChart
class CurrencyChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: getData(),

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
    const { dates, historicalData } = this.state;

    if (!historicalData) {
      return null;
    }
// console.log(getData())
  // create array with historical exchange rates
    const pastPrices = (Object.values(historicalData))
    const exchangeRates = []
    for (let i = 0; i < pastPrices.length; i++) {
      const element = pastPrices[i];
      for (const property in element) {
        exchangeRates.push(element[property])
       }
     }
    // console.log(exchangeRates)
    // console.log(dates)


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

export default CurrencyChart
