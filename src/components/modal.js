import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import getAssetUrl from '../utils/getAssetUrl';

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { modalOpen, closeModal } = value;
          const { img, title } = value.modalProduct;

          if (!modalOpen) return null;

          return (
            <React.Fragment>
              <div
                className='store-modal-backdrop'
                onClick={() => closeModal()}
                role='presentation'
              />
              <div className='store-modal-card' role='dialog' aria-modal='true'>
                <button
                  type='button'
                  className='store-modal-close'
                  onClick={() => closeModal()}
                  aria-label='Close'
                >
                  <i className='fas fa-times' />
                </button>
                <div className='store-modal-icon'>
                  <i className='fas fa-check-circle' />
                </div>
                <h5>Added to your cart</h5>
                <img src={getAssetUrl(img)} alt={title} />
                <p className='store-modal-title'>{title}</p>
                <div className='store-modal-actions'>
                  <Link
                    to='/cart'
                    className='btn btn-primary store-btn'
                    onClick={() => closeModal()}
                  >
                    <i className='fas fa-shopping-cart' /> Go to Cart
                  </Link>
                  <button
                    type='button'
                    className='btn btn-outline-secondary store-btn'
                    onClick={() => closeModal()}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </ProductConsumer>
    );
  }
}
