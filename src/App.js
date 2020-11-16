import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Currencies from './Currencies';
import Header from './Header';
import Footer from './Footer';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact component={Currencies} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <Footer />
    </React.Fragment>
  );
}

export default App;
