import React from 'react'
import './App.css'

const Header = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-sm fixed-top">
      <span><a className="navbar-brand" href="#"><i className="fas fa-home fa-lg"></i></a></span>
      <span className="nav navbar-nav ml-auto"><a className="navbar-brand" href="#"><p className="h3">Currency Converter</p></a></span>
      <span className="nav navbar-nav ml-auto"><a className="navbar-brand" href="#bottom"><p className="h5">Contact</p></a></span>
    </nav>
  )
}

export default Header
