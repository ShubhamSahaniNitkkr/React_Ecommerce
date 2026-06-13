import React from 'react';
import { BRANDS } from '../data';

export default function ProductFilters({ value }) {
  const {
    searchQuery,
    brandFilter,
    sortBy,
    setSearchQuery,
    setBrandFilter,
    setSortBy,
    getFilteredProducts,
    products,
  } = value;

  const count = getFilteredProducts().length;
  const total = products.length;

  return (
    <section className='store-filters' id='products'>
      <div className='container'>
        <div className='store-filters-bar'>
          <div className='store-search-wrap'>
            <i className='fas fa-search store-search-icon' />
            <input
              type='search'
              className='form-control store-search-input'
              placeholder='Search phones, brands...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label='Search products'
            />
          </div>

          <div className='store-filter-controls'>
            <div className='store-brand-chips'>
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  type='button'
                  className={`store-brand-chip${
                    brandFilter === brand ? ' active' : ''
                  }`}
                  onClick={() => setBrandFilter(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>

            <select
              className='form-control store-sort-select'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label='Sort products'
            >
              <option value='featured'>Featured</option>
              <option value='price-asc'>Price: Low to High</option>
              <option value='price-desc'>Price: High to Low</option>
              <option value='rating'>Top Rated</option>
              <option value='name'>Name A–Z</option>
            </select>
          </div>
        </div>

        <p className='store-results-count'>
          Showing <strong>{count}</strong> of {total} products
        </p>
      </div>
    </section>
  );
}
