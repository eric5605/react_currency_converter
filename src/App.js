import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Currencies from './Currencies';


import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Currency Converter</Link>
      </nav>

      <Switch>
        <Route path="/" exact component={Currencies} />
        <Route component={NotFound} />
      </Switch>

      <footer className="p-3 bg-light">
        <div className="mb-2">
          <a className="badge" href="https://github.com/eric5605/react_currency_converter">GitHub</a>
        </div>
        <div className="mb-2">
          <a className="badge" href="https://www.linkedin.com/in/eric-herman-14857a92">linkedin</a>
        </div>
        <div>
        </div>
      </footer>

    </Router>


  );
}

export default App;
