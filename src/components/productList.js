import React, { Component } from 'react';
import Hero from './hero';
import ProductFilters from './productFilters';
import Product from './product';
import { ProductConsumer } from '../context';

export default class ProductList extends Component {
  render() {
    return (
      <React.Fragment>
        <Hero />
        <ProductConsumer>
          {(value) => (
            <React.Fragment>
              <ProductFilters value={value} />
              <div className='container store-container'>
                <div className='store-product-grid'>
                  {value.getFilteredProducts().length > 0 ? (
                    value.getFilteredProducts().map((product) => (
                      <Product key={product.id} product={product} />
                    ))
                  ) : (
                    <div className='store-no-results'>
                      <i className='fas fa-search' />
                      <h4>No products found</h4>
                      <p>Try a different search or clear your filters.</p>
                      <button
                        type='button'
                        className='btn btn-primary store-btn'
                        onClick={() => {
                          value.setSearchQuery('');
                          value.setBrandFilter('All');
                        }}
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          )}
        </ProductConsumer>
      </React.Fragment>
    );
  }
}
