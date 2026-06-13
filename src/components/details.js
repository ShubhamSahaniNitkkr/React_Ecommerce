import React, { Component } from 'react';
import { ProductConsumer, ProductContext } from '../context';
import { Link } from 'react-router-dom';
import StarRating from './starRating';
import Product from './product';
import { formatPrice } from '../utils/formatPrice';
import getAssetUrl from '../utils/getAssetUrl';

export default class Details extends Component {
  componentDidMount() {
    this.syncProductFromRoute();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.syncProductFromRoute();
    }
  }

  syncProductFromRoute = () => {
    const id = parseInt(this.props.match.params.id, 10);
    if (id) {
      this.context.handleDetails(id);
    }
  };

  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const routeId = parseInt(this.props.match.params.id, 10);
          const product =
            value.products.find((item) => item.id === routeId) ||
            value.detailProduct;
          const {
            id,
            company,
            img,
            info,
            price,
            originalPrice,
            title,
            inCart,
            rating,
            reviews,
            specs,
            category,
            inStock,
          } = product;

          const related = value.products.filter(
            (item) => item.company === company && item.id !== id
          ).slice(0, 4);

          const onSale = originalPrice && originalPrice > price;

          return (
            <div className='container store-container'>
              <nav className='store-breadcrumb' aria-label='breadcrumb'>
                <Link to='/'>Home</Link>
                <span>/</span>
                <span>{title}</span>
              </nav>

              <div className='card store-detail-card'>
                <div className='row no-gutters'>
                  <div className='col-lg-5 store-detail-image-col'>
                    <div className='store-detail-image-wrap'>
                      {onSale && <span className='product-badge sale'>Sale</span>}
                      <img
                        src={getAssetUrl(img)}
                        alt={title}
                        className='store-detail-image'
                      />
                    </div>
                  </div>

                  <div className='col-lg-7'>
                    <div className='store-detail-body'>
                      <div className='product-card-meta'>
                        <span className='product-brand'>{company}</span>
                        <span className='product-category'>{category}</span>
                      </div>
                      <h1 className='store-detail-title'>{title}</h1>
                      <StarRating rating={rating} reviews={reviews} />

                      <div className='store-detail-price'>
                        <span className='product-price-current'>{formatPrice(price)}</span>
                        {onSale && (
                          <span className='product-price-original'>
                            {formatPrice(originalPrice)}
                          </span>
                        )}
                        {onSale && (
                          <span className='product-save-badge'>
                            Save {formatPrice(originalPrice - price)}
                          </span>
                        )}
                      </div>

                      <p className='store-detail-info'>{info}</p>

                      <div className='store-detail-stock'>
                        <i className={`fas fa-circle ${inStock ? 'in-stock' : 'out-stock'}`} />
                        {inStock ? 'In stock — ships within 24 hours' : 'Out of stock'}
                      </div>

                      <div className='store-specs'>
                        <h5>Specifications</h5>
                        <ul>
                          <li><span>Display</span><strong>{specs.display}</strong></li>
                          <li><span>Storage</span><strong>{specs.storage}</strong></li>
                          <li><span>Camera</span><strong>{specs.camera}</strong></li>
                          <li><span>Battery</span><strong>{specs.battery}</strong></li>
                        </ul>
                      </div>

                      <div className='store-detail-actions'>
                        <button
                          type='button'
                          className='btn btn-primary store-btn store-btn-lg'
                          disabled={inCart || !inStock}
                          onClick={() => {
                            value.addToCart(id);
                            value.openModal(id);
                          }}
                        >
                          <i className='fas fa-shopping-cart' />{' '}
                          {inCart ? 'Already in Cart' : 'Add to Cart'}
                        </button>
                        <Link to='/cart'>
                          <button
                            type='button'
                            className='btn btn-success store-btn store-btn-lg'
                            disabled={!inStock}
                            onClick={() => {
                              if (!inCart) value.addToCart(id);
                            }}
                          >
                            Buy Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {related.length > 0 && (
                <section className='store-related'>
                  <h3>You may also like</h3>
                  <div className='store-product-grid'>
                    {related.map((item) => (
                      <Product key={item.id} product={item} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

Details.contextType = ProductContext;
