import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { ProductConsumer } from '../context';

export default class Navbar extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { closeModal } = value;

          return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top'>
              <Link to='/' className='navbar-brand d-flex align-items-center'>
                <img src={logo} alt='Ecommerce' className='navbar-brand-logo' />
              </Link>

              <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#storeNavbar'
                aria-controls='storeNavbar'
                aria-expanded='false'
                aria-label='Toggle navigation'
              >
                <span className='navbar-toggler-icon'></span>
              </button>

              <div className='collapse navbar-collapse' id='storeNavbar'>
                <ul className='navbar-nav mr-auto'>
                  <li className='nav-item active'>
                    <Link to='/' className='nav-link'>
                      Products
                    </Link>
                  </li>
                </ul>

                <Link to='/cart' className='ml-lg-auto'>
                  <button
                    type='button'
                    className='btn btn-info btn-block btn-sm-lg'
                    onClick={() => closeModal()}
                  >
                    <i className='fas fa-shopping-bag'></i> My Cart
                  </button>
                </Link>
              </div>
            </nav>
          );
        }}
      </ProductConsumer>
    );
  }
}
