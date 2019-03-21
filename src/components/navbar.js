import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from "../logo.svg";
export default class Navbar extends Component {
  render() {
    return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
              <img src={logo} alt="Ecommerce" className="navbar-brand"/>
            </Link>

            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">Products</Link>
              </li>
            </ul>

            <Link to="/cart" className="ml-auto">
              <button type="button" className="btn btn-info">  <i className="fas fa-shopping-bag"></i> My Cart</button>
            </Link>

          </nav>
    )
  }
}
