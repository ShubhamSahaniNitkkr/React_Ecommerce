import React, { Component } from 'react';
import Title from "../title";
import CartColumn from "./cartColumn";

export default class Cart extends Component {
  render() {
    return(
        <React.Fragment>
        <Title name="Your" title="Cart"/>
        <CartColumn/>
        </React.Fragment>
    )
  }
}
