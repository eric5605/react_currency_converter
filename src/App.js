import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Currencies from './Currencies';
import Header from './Header';
import Footer from './Footer';


import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}


const App = () => {
  return (
    <div>
      <Header />
        <Router>
          <Switch>
            <Route path="/" exact component={Currencies} />
              <Currencies />
            <Route component={NotFound} />
          </Switch>
        </Router>
      <Footer />
    </div>
  );
}

export default App;
