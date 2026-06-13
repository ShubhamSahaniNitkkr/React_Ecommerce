import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Default extends Component {
  render() {
    return (
      <div className='store-empty-cart'>
        <div className='store-empty-cart-icon'>
          <i className='fas fa-exclamation-triangle' />
        </div>
        <h2>Page not found</h2>
        <p>
          The page <strong>{this.props.location.pathname}</strong> does not exist.
        </p>
        <Link to='/' className='btn btn-primary store-btn'>
          Back to Shop
        </Link>
      </div>
    );
  }
}
