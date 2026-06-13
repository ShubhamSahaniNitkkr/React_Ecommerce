import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import PropTypes from 'prop-types';

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <div className='col-12 col-sm-6 col-lg-4 col-xl-3'>
        <ProductConsumer>
          {(value) => (
            <div
              className='card mx-auto my-2 shadow-sm p-3 mb-4 bg-white rounded product-card h-100'
              onClick={() => value.handleDetails(id)}
            >
              <Link to='/details'>
                <img
                  src={img}
                  className='card-img-top'
                  alt={title}
                  onClick={() => value.closeModal()}
                />
              </Link>
              <div className='card-body p-0'>
                <h5 className='card-title text-truncate'>{title}</h5>
                <p className='card-text'>Price : ${price}</p>
                <hr />
                <div className='product-card-actions'>
                  <Link
                    to='/details'
                    className='btn btn-outline-primary'
                    onClick={() => {
                      value.handleDetails(id);
                      value.closeModal();
                    }}
                  >
                    Details
                  </Link>

                  <button
                    className='btn btn-outline-info'
                    disabled={inCart ? true : false}
                    onClick={() => {
                      value.addToCart(id);
                      value.openModal(id);
                    }}
                  >
                    <i className='fas fa-shopping-bag'></i>{' '}
                    {inCart ? 'In ' : 'Add to '} Cart{' '}
                  </button>
                </div>
              </div>
            </div>
          )}
        </ProductConsumer>
      </div>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    inCart: PropTypes.bool,
  }).isRequired,
};
