import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import PaypalButton from './paypalButton';

export default function CartTotal({ value, history }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;

  return (
    <div className='store-cart-summary'>
      <div className='store-cart-summary-rows'>
        <div className='store-cart-summary-row'>
          <span>Subtotal</span>
          <strong>{formatPrice(cartSubTotal)}</strong>
        </div>
        <div className='store-cart-summary-row'>
          <span>Tax (10%)</span>
          <strong>{formatPrice(cartTax)}</strong>
        </div>
        <div className='store-cart-summary-row total'>
          <span>Order Total</span>
          <strong>{formatPrice(cartTotal)}</strong>
        </div>
      </div>

      <div className='store-cart-summary-actions'>
        <Link to='/'>
          <button type='button' className='btn btn-outline-secondary store-btn'>
            <i className='fas fa-arrow-left' /> Continue Shopping
          </button>
        </Link>
        <button type='button' className='btn btn-outline-danger store-btn' onClick={() => clearCart()}>
          <i className='fas fa-trash-alt' /> Clear Cart
        </button>
      </div>

      <div className='store-cart-checkout'>
        <h5>Secure Checkout</h5>
        <p className='text-muted'>Pay safely with PayPal sandbox (demo mode)</p>
        <PaypalButton total={cartTotal} clearCart={clearCart} history={history} />
      </div>
    </div>
  );
}
