import React, { Component } from 'react';
import {ecommerceProducts,detailProduct} from './data';
const ProductContext= React.createContext();

class ProductProvider extends Component {
  state={
    products:[],
    detailProduct:detailProduct,
    cart:[],
    modlaOpen:true,
    modalProduct:detailProduct,
    cartSubTotal:0,
    cartTax:0,
    cartTotal:0
  }
  componentDidMount(){
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts=[];
    ecommerceProducts.forEach(item => {
      const singleItem = {...item};
      tempProducts = [...tempProducts,singleItem];
    });
    this.setState(() =>{
      return { products :tempProducts};
    });
  };

  getItem = (id) =>{
    const product = this.state.products.find(item=>item.id===id);
    return product;
  };

  handleDetails = (id) => {
      const product = this.getItem(id);
      this.setState(() =>{
        return {detailProduct:product}
      })
  };

  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index=tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart=true;
    product.count=1;
    const price = product.price;
    product.total = price;
    this.setState(() => {
      return { products :tempProducts,cart :[...this.state.cart,product] };
    },

    () => {
      this.addTotals();
    }
  );
 };

 openModal = id =>{
   const product = this.getItem(id);
   this.setState(() =>{
     return{
       modalProduct:product,
       modalOpen:true
     }
   })
 }

 closeModal = (id) =>{
   this.setState(() =>{
     return{
       modalOpen:false
     }
   })
 };

 increment = (id) =>{
   console.log(`this is increment`);

 };


decrement = (id) =>{
  console.log(`this is decrement`);
};


removeItem = (id) =>{
  console.log(`this is remove`);
};

clearCart = () =>{
    this.setState(()=>{
      return {cart:[]};

    },()=>{
      this.setProducts();
      this.addTotals();
    });
};

addTotals = () =>{
  let subTotal = 0;
  this.state.cart.map(item =>(subTotal += item.total));
  const tempTax= subTotal * 0.1;
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal + tax;
  this.setState(()=>{
    return {
      cartSubTotal:subTotal,
      cartTax:tax,
      cartTotal:total
    }
  })
}




  render(){
    return(
      <ProductContext.Provider value={{...this.state,
          handleDetails:this.handleDetails,
          addToCart:this.addToCart,
          openModal:this.openModal,
          closeModal:this.closeModal,
          increment:this.increment,
          decrement:this.decrement,
          removeItem:this.removeItem,
          clearCart:this.clearCart
        }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;
export {ProductProvider , ProductConsumer};
