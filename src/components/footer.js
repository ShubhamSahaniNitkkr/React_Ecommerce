import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='store-footer'>
      <div className='container'>
        <div className='row store-footer-grid'>
          <div className='col-md-4 store-footer-col'>
            <h5>PhoneStore</h5>
            <p>
              Your trusted destination for premium smartphones. Curated selection,
              honest pricing, and fast delivery nationwide.
            </p>
          </div>
          <div className='col-md-2 store-footer-col'>
            <h6>Shop</h6>
            <ul>
              <li><Link to='/'>All Products</Link></li>
              <li><Link to='/'>Flagship Phones</Link></li>
              <li><Link to='/'>Budget Picks</Link></li>
              <li><Link to='/cart'>My Cart</Link></li>
            </ul>
          </div>
          <div className='col-md-3 store-footer-col'>
            <h6>Support</h6>
            <ul>
              <li><a href='#products'>Shipping Info</a></li>
              <li><a href='#products'>Returns &amp; Refunds</a></li>
              <li><a href='#products'>Warranty</a></li>
              <li><a href='#products'>Contact Us</a></li>
            </ul>
          </div>
          <div className='col-md-3 store-footer-col'>
            <h6>Connect</h6>
            <div className='store-footer-social'>
              <a href='#products' aria-label='Facebook'><i className='fab fa-facebook-f' /></a>
              <a href='#products' aria-label='Twitter'><i className='fab fa-twitter' /></a>
              <a href='#products' aria-label='Instagram'><i className='fab fa-instagram' /></a>
            </div>
            <p className='store-footer-note'>
              <i className='fas fa-envelope' /> hello@phonestore.demo
            </p>
          </div>
        </div>
        <div className='store-footer-bottom'>
          <span>&copy; {new Date().getFullYear()} PhoneStore. Demo ecommerce project.</span>
          <span>Built with React</span>
        </div>
      </div>
    </footer>
  );
}
