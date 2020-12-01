import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Header from './Header'
import Currencies from './Currencies';
import Footer from './Footer'
import CurrencyChartData from './CurrencyChart'
// import Chart from 'chart.js'

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/" exact component={Currencies} />
          <Route path="/currencychart/" component={CurrencyChartData} />

          <Route component={NotFound} />
       </Switch>
     <Footer />
    </Router>
  );
}

export default App;
