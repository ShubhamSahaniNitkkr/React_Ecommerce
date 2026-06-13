import React, { Component } from 'react';
import { ProductConsumer } from '../../context';
import CartList from './cartList';
import CartTotal from './cartTotal';
import EmptyCart from './emptyCart';

export default class Cart extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { cart } = value;

          if (cart.length === 0) {
            return <EmptyCart />;
          }

          return (
            <div className='container store-container store-cart-page'>
              <div className='store-page-header'>
                <h1>Shopping Cart</h1>
                <p>{value.getCartCount()} item(s) in your cart</p>
              </div>
              <CartList value={value} />
              <CartTotal value={value} history={this.props.history} />
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
