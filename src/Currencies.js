import React from 'react';
import './App.css';

// 101_React_Currency_Converter/src/images/pexels-anthony-157520.jpg
class Currencies extends React.Component {
  constructor() {
    super();

    this.state = {
      baseCurrency:'USD',
      convertToCurrency:'GBP',
      baseAmount: 1,
      rates: [],
      currencies: [],
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

  changeBaseCurrency(e) {
    this.setState({ baseCurrency: e.target.value});
    this.callAPI(e.target.value)
  }

 callAPI(base) {
    const api = `https://alt-exchange-rate.herokuapp.com/latest?base=${base}`;

    fetch(api)
     .then(results => {
        return results.json();
    }).then(data => this.setState({
      rates: data['rates'],
      currencies: Object.keys(data['rates']).sort(),
    }));
 }

  changeConvertToCurrency(e) {
    this.setState({ convertToCurrency: e.target.value });
  }

  changeBaseAmount(e) {
   this.setState({ baseAmount: e.target.value });
  }

  getConvertedCurrency(baseAmount,convertToCurrency,rates) {
      return Number.parseFloat(baseAmount * rates[convertToCurrency]).toFixed(3);
  }

  render() {

     const {currencies,rates,baseCurrency,baseAmount,convertToCurrency} = this.state;

     const currencyChoice = currencies.map(currency =>
       <option key={currency} value={currency}> {currency} </option>
     );

     const result = this.getConvertedCurrency(baseAmount, convertToCurrency, rates);

     // currency list

     const tableRows = Object.keys(rates).map(function(key) {
       const convertedRate = (Number.parseFloat(rates[key]).toFixed(3) * baseAmount);
       const countryCode = key;

       return (
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

        <h3 className="currency-list">Exchange Rates Table</h3>
          <table className="table table-striped table-custom">
          <thead>
             <tr>
               <th className="country-code">Country</th>
               <th className="converted-rate">{baseAmount}.00 {baseCurrency}</th>
             </tr>
            </thead>
               <tbody>{tableRows}</tbody>

          </table>

         </div>
     );
   }
 }

export default Currencies
