import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className='store-hero'>
      <div className='store-hero-overlay' />
      <div className='container store-hero-content'>
        <div className='store-hero-inner'>
        <span className='store-hero-badge'>New arrivals · Free shipping over $500</span>
        <h1 className='store-hero-title'>Premium phones. Best prices.</h1>
        <p className='store-hero-subtitle'>
          Shop flagship devices from Apple, Samsung, Google, and HTC. Secure checkout,
          10-day returns, and expert support.
        </p>
        <div className='store-hero-actions'>
          <a href='#products' className='btn btn-primary store-btn store-hero-cta'>
            Shop Now
          </a>
          <Link to='/cart' className='btn btn-outline-light store-btn store-hero-cart-btn'>
            View Cart
          </Link>
        </div>
        <div className='store-trust-badges'>
          <span><i className='fas fa-shipping-fast' /> Free delivery</span>
          <span><i className='fas fa-shield-alt' /> Secure payment</span>
          <span><i className='fas fa-undo' /> Easy returns</span>
          <span><i className='fas fa-headset' /> 24/7 support</span>
        </div>
        </div>
      </div>
    </section>
  );
}
