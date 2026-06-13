import React from 'react';
import CartItem from './cartItem';

export default function CartList({ value }) {
  const { cart } = value;
  return (
    <React.Fragment>
      <div className='table-responsive cart-table-wrap'>
      <table className='table table-bordered table-hover text-center table-striped mb-0'>
        <thead className='bg-light'>
          <tr>
            <th scope='col'>Product</th>
            <th scope='col'>Name</th>
            <th scope='col'>Price</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Remove</th>
            <th scope='col'>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return <CartItem key={item.id} item={item} value={value} />;
          })}
        </tbody>
      </table>
      </div>
    </React.Fragment>
  );
}
