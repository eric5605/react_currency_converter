import React from 'react';
import './App.css'

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
      allMoney: data
    }));

// console.log(api)
// console.log(this.state.currencies)
// console.log(this.state.rates)

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

      const convertedRate = Number.parseFloat(rates[key]).toFixed(3);
      const countryName = key;

      return (
        <tr key={key}>
            <td>{countryName}  .......................................................  {convertedRate} </td>
        </tr>
      )
    })


    return(

    <div className="form-container text-center pt-5" id='currency-exchange'>
        <form className='ui mini form main' id='exchange-box'>

         <h3>Convert from: {baseCurrency}</h3>
          <select  value={baseCurrency} onChange={this.changeBaseCurrency}>
            {currencyChoice}
            <option>{baseCurrency}</option>
          </select>

          <h3>Convert to: {convertToCurrency}</h3>
          <select value={convertToCurrency} onChange={this.changeConvertToCurrency}>
            {currencyChoice}
          </select>

         <h3>Amount:</h3>
           <input type='number'
                  id='base-amount'
                  defaultValue={baseAmount}
                  onChange={this.changeBaseAmount}>
          </input>
       </form>

       <h2 id='result-text'>{baseAmount} {baseCurrency} is equal to {result} {convertToCurrency}</h2>
       <hr />

       <div className="container pt-5">
          <table className="currency-list">
              <tbody>{tableRows}</tbody>
          </table>
        </div>


     </div>



    );
  }
}



export default Currencies;
