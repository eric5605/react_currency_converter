import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Header from './Header'
import Currencies from './Currencies';
import Chart from './Chart';
import Footer from './Footer'


const App = () => {
  return (
    <Router>
      <Header />
        <Switch>
          <Route path="/" exact component={Currencies} />
          <Route path="/chart/" component={Chart} />
         <Route path="/currencies/" component={Currencies} />
       </Switch>
     <Footer />
    </Router>
  );
}

export default App;
