import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ProductConsumer } from '../context';
import PropTypes from 'prop-types';
import StarRating from './starRating';
import { formatPrice } from '../utils/formatPrice';
import getAssetUrl from '../utils/getAssetUrl';

export default class Product extends Component {
  render() {
    const {
      id,
      title,
      img,
      price,
      originalPrice,
      company,
      category,
      rating,
      reviews,
      inCart,
      featured,
    } = this.props.product;

    const onSale = originalPrice && originalPrice > price;

    return (
      <ProductConsumer>
        {(value) => (
          <article className='product-card h-100'>
            <div className='product-card-badges'>
              {featured && <span className='product-badge featured'>Featured</span>}
              {onSale && <span className='product-badge sale'>Sale</span>}
            </div>

            <Link
              to={`/details/${id}`}
              className='product-card-image-link'
              onClick={() => {
                value.handleDetails(id);
                value.closeModal();
              }}
            >
              <img
                src={getAssetUrl(img)}
                className='card-img-top'
                alt={title}
                loading='lazy'
              />
            </Link>

            <div className='card-body product-card-body'>
              <div className='product-card-meta'>
                <span className='product-brand'>{company}</span>
                <span className='product-category'>{category}</span>
              </div>
              <Link
                to={`/details/${id}`}
                className='product-card-title'
                onClick={() => {
                  value.handleDetails(id);
                  value.closeModal();
                }}
              >
                {title}
              </Link>
              <StarRating rating={rating} reviews={reviews} />
              <div className='product-card-price'>
                <span className='product-price-current'>{formatPrice(price)}</span>
                {onSale && (
                  <span className='product-price-original'>
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>

              <div className='product-card-actions'>
                <Link
                  to={`/details/${id}`}
                  className='btn btn-outline-primary store-btn'
                  onClick={() => {
                    value.handleDetails(id);
                    value.closeModal();
                  }}
                >
                  View Details
                </Link>

                <button
                  type='button'
                  className='btn btn-primary store-btn'
                  disabled={inCart}
                  onClick={(e) => {
                    e.stopPropagation();
                    value.addToCart(id);
                    value.openModal(id);
                  }}
                >
                  <i className='fas fa-shopping-cart' />{' '}
                  {inCart ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </article>
        )}
      </ProductConsumer>
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
