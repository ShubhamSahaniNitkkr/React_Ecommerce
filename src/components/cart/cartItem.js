import React from 'react';
import { formatPrice } from '../../utils/formatPrice';
import getAssetUrl from '../../utils/getAssetUrl';

export default function CartItem({ item, value }) {
  const { id, title, img, price, total, count } = item;
  const { increment, decrement, removeItem } = value;

  return (
    <React.Fragment>
      <tr className='cart-row-desktop'>
        <td>
          <img src={getAssetUrl(img)} alt={title} className='cart-item-img' />
        </td>
        <td className='text-left'>{title}</td>
        <td>{formatPrice(price)}</td>
        <td>
          <div className='cart-qty-controls'>
            <button
              type='button'
              className='btn btn-sm btn-outline-secondary'
              onClick={() => decrement(id)}
              aria-label='Decrease quantity'
            >
              <i className='fas fa-minus' />
            </button>
            <span className='cart-qty-value'>{count}</span>
            <button
              type='button'
              className='btn btn-sm btn-outline-secondary'
              onClick={() => increment(id)}
              aria-label='Increase quantity'
            >
              <i className='fas fa-plus' />
            </button>
          </div>
        </td>
        <td>
          <button
            type='button'
            className='btn btn-sm btn-outline-danger'
            onClick={() => removeItem(id)}
            aria-label='Remove item'
          >
            <i className='fas fa-trash-alt' />
          </button>
        </td>
        <td className='cart-line-total'>{formatPrice(total)}</td>
      </tr>

      <tr className='cart-row-mobile'>
        <td colSpan='6'>
          <div className='cart-mobile-card'>
            <img src={getAssetUrl(img)} alt={title} />
            <div className='cart-mobile-info'>
              <h6>{title}</h6>
              <p>{formatPrice(price)} each</p>
              <div className='cart-qty-controls'>
                <button
                  type='button'
                  className='btn btn-sm btn-outline-secondary'
                  onClick={() => decrement(id)}
                >
                  <i className='fas fa-minus' />
                </button>
                <span className='cart-qty-value'>{count}</span>
                <button
                  type='button'
                  className='btn btn-sm btn-outline-secondary'
                  onClick={() => increment(id)}
                >
                  <i className='fas fa-plus' />
                </button>
              </div>
              <div className='cart-mobile-footer'>
                <strong>{formatPrice(total)}</strong>
                <button
                  type='button'
                  className='btn btn-sm btn-outline-danger'
                  onClick={() => removeItem(id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}
