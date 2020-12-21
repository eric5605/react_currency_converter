import React from 'react';
import './App.css';
import CurrencyChart from './CurrencyChart'

class Currencies extends React.Component {
  constructor() {
    super();
    this.state = {
      baseCurrency:'USD',
      convertToCurrency:'JPY',
      baseAmount: 1,
      rates: [],
      currencies: [],
      historicData: [],
      pastDates: [],
      historicExchangeRates: [],
    };

    this.changeBaseCurrency = this.changeBaseCurrency.bind(this);
    this.changeConvertToCurrency = this.changeConvertToCurrency.bind(this);
    this.changeBaseAmount = this.changeBaseAmount.bind(this);
    this.getConvertedCurrency = this.getConvertedCurrency.bind(this);
    this.callAPI = this.callAPI.bind(this);
  }

  componentDidMount() {
   this.callAPI(this.state.baseCurrency)
  }

  callAPI(base, convertToCurrency = this.state.convertToCurrency) {
    const api = `https://alt-exchange-rate.herokuapp.com/latest?base=${base}`;

    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    const api2 = (`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${convertToCurrency}`)

    fetch(api)
     .then(results => {
        return results.json();
    }).then(data => this.setState({
      rates: data['rates'],
      currencies: Object.keys(data['rates']).sort(),
    }));

    fetch(api2)
     .then(results => {
        return results.json();
    }).then(data => this.setState({
      historicData: data['rates'],
      pastDates: Object.keys(data['rates']),
    }));
 }

 changeBaseCurrency(e) {
   this.setState({ baseCurrency: e.target.value});
   this.callAPI(e.target.value);
 }

  changeConvertToCurrency(e) {
    this.setState({ convertToCurrency: e.target.value });
  }

  changeBaseAmount(e) {
    this.setState({ baseAmount: e.target.value });
  }

  getConvertedCurrency(baseAmount,convertToCurrency,rates) {
    return Number.parseFloat(baseAmount * rates[convertToCurrency]).toFixed(6);
  }

  render() {

    const {currencies,rates,baseCurrency,baseAmount,convertToCurrency, historicData, historicExchangeRates} = this.state;

    const currencyChoice = currencies.map(currency =>
       <option key={currency} value={currency}> {currency} </option>
     );

    const result = this.getConvertedCurrency(baseAmount, convertToCurrency, rates);

    if (!historicData) {
      return null
    }
    const pastPrices = (Object.values(historicData))
      for (let i = 0; i < pastPrices.length; i++) {
        const element = pastPrices[i];
        for (const property in element) {
        historicExchangeRates.push(element[property])
       }
     }


    // Exchange Table
    const tableRows = Object.keys(rates).map(function(key) {
      const convertedRate = (Number.parseFloat(rates[key]) * baseAmount).toFixed(6);
      const countryCode = key;

      return(
        <tr key={key}>
          <td className="country-code">{countryCode}</td>
          <td className="converted-rate">{convertedRate} </td>
        </tr>
       )
     })

     return(

       <div className="container text-center converter">
         <form className='ui mini form main'>

          <h3>Convert from: {baseCurrency}</h3>
           <select
              value={baseCurrency}
              onChange={this.changeBaseCurrency}>{currencyChoice}
               <option>{baseCurrency}</option>
           </select>

           <h3>Convert to: {convertToCurrency}</h3>
           <select
              value={convertToCurrency}
              onChange={this.changeConvertToCurrency}>{currencyChoice}
           </select>

          <h3>Amount:</h3>
            <input type='number'
                   id='base-amount'
                   defaultValue={baseAmount}
                   className="amount-box"
                   onChange={this.changeBaseAmount}>
           </input>
          <h3>{baseAmount} {baseCurrency} is equal to {result} {convertToCurrency}</h3>
        </form>
        <hr />

        <h3 className="currency-list currency-table">Exchange Rates Table</h3>
          <table className="table table-striped table-custom">
            <thead>
               <tr>
                 <th className="country-code">Country</th>
                 <th className="converted-rate">{baseAmount}.00 {baseCurrency}</th>
               </tr>
              </thead>
               <tbody>{tableRows}</tbody>
          </table>

          <div className="CurrencyChart text-center py-5">
            <div>
               <CurrencyChart
                 message="This is a message from parent Component Currencies.js"
                 pastDates={this.state.pastDates}
                 historicExchangeRates={this.state.historicExchangeRates}
                 baseCurrency={baseCurrency}
                 compareCurrency={convertToCurrency}
                 historicData={historicData}
              />
             </div>
         </div>
      </div>
     );
   }
 }

export default Currencies
