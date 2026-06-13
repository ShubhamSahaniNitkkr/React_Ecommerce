import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';

export default class Navbar extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { closeModal, getCartCount } = value;
          const cartCount = getCartCount();

          return (
            <nav className='navbar navbar-expand-lg navbar-dark store-navbar sticky-top'>
              <Link to='/' className='navbar-brand store-brand' onClick={() => closeModal()}>
                <i className='fas fa-mobile-alt store-brand-icon' />
                <span>PhoneStore</span>
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
                <span className='navbar-toggler-icon' />
              </button>

              <div className='collapse navbar-collapse' id='storeNavbar'>
                <ul className='navbar-nav mr-auto'>
                  <li className='nav-item'>
                    <Link to='/' className='nav-link' onClick={() => closeModal()}>
                      Shop
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <a href='#products' className='nav-link'>
                      Deals
                    </a>
                  </li>
                </ul>

                <Link to='/cart' className='store-cart-link' onClick={() => closeModal()}>
                  <button type='button' className='btn store-cart-btn'>
                    <i className='fas fa-shopping-cart' />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className='store-cart-badge'>{cartCount}</span>
                    )}
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
