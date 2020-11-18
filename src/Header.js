import React from 'react'
import './App.css'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Header = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
         <Link to="/chart/"><span className="navbar-brand h1">Chart</span></Link>

         <Link to="/"><span className="navbar-brand  h1">Home</span></Link>

         <Link to="/currencies/"><span className="navbar-brand  h1">Currencies Table</span></Link>
     </nav>
    </React.Fragment>
  )
}

export default Header
