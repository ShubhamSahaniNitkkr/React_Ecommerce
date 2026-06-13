import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyCart() {
  return (
    <div className='store-empty-cart'>
      <div className='store-empty-cart-icon'>
        <i className='fas fa-shopping-cart' />
      </div>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven&apos;t added any phones yet. Browse our collection and find your next device.</p>
      <Link to='/' className='btn btn-primary store-btn'>
        <i className='fas fa-store' /> Start Shopping
      </Link>
    </div>
  );
}
