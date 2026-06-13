import React, { Component } from 'react';
import { ecommerceProducts, detailProduct } from './data';

const ProductContext = React.createContext();
const CART_KEY = 'ecommerce-cart';

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
    searchQuery: '',
    brandFilter: 'All',
    sortBy: 'featured',
  };

  componentDidMount() {
    this.setProducts();
  }

  cloneProducts = () =>
    ecommerceProducts.map((item) => ({ ...item, specs: { ...item.specs } }));

  restoreCart = (products) => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY));
      if (!saved || !Array.isArray(saved)) {
        return { products, cart: [] };
      }

      const cart = [];
      saved.forEach(({ id, count }) => {
        const product = products.find((item) => item.id === id);
        if (product && count > 0) {
          product.inCart = true;
          product.count = count;
          product.total = count * product.price;
          cart.push(product);
        }
      });

      return { products, cart };
    } catch {
      return { products, cart: [] };
    }
  };

  persistCart = () => {
    const payload = this.state.cart.map(({ id, count }) => ({ id, count }));
    localStorage.setItem(CART_KEY, JSON.stringify(payload));
  };

  setProducts = () => {
    const products = this.cloneProducts();
    const { products: restoredProducts, cart } = this.restoreCart(products);

    this.setState({ products: restoredProducts, cart }, () => {
      this.addTotals();
    });
  };

  getItem = (id) => this.state.products.find((item) => item.id === id);

  getCartCount = () =>
    this.state.cart.reduce((total, item) => total + item.count, 0);

  getFilteredProducts = () => {
    const { products, searchQuery, brandFilter, sortBy } = this.state;
    const query = searchQuery.trim().toLowerCase();

    let filtered = products.filter((product) => {
      const matchesSearch =
        !query ||
        product.title.toLowerCase().includes(query) ||
        product.company.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesBrand =
        brandFilter === 'All' ||
        product.company.toLowerCase() === brandFilter.toLowerCase();

      return matchesSearch && matchesBrand;
    });

    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      if (a.featured !== b.featured) return b.featured - a.featured;
      return a.id - b.id;
    });

    return filtered;
  };

  setSearchQuery = (searchQuery) => this.setState({ searchQuery });

  setBrandFilter = (brandFilter) => this.setState({ brandFilter });

  setSortBy = (sortBy) => this.setState({ sortBy });

  handleDetails = (id) => {
    const product = this.getItem(id);
    if (product) {
      this.setState({ detailProduct: product });
    }
  };

  addToCart = (id) => {
    const product = this.getItem(id);
    if (!product || product.inCart) return;

    const tempProducts = [...this.state.products];
    const index = tempProducts.findIndex((item) => item.id === id);
    const updated = { ...tempProducts[index] };
    updated.inCart = true;
    updated.count = 1;
    updated.total = updated.price;
    tempProducts[index] = updated;

    this.setState(
      { products: tempProducts, cart: [...this.state.cart, updated] },
      () => {
        this.addTotals();
        this.persistCart();
      }
    );
  };

  openModal = (id) => {
    const product = this.getItem(id);
    if (product) {
      this.setState({ modalProduct: product, modalOpen: true });
    }
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  increment = (id) => {
    const tempCart = this.state.cart.map((item) => {
      if (item.id !== id) return item;
      const count = item.count + 1;
      return { ...item, count, total: count * item.price };
    });

    this.setState({ cart: tempCart }, () => {
      this.syncProductCounts(tempCart);
      this.addTotals();
      this.persistCart();
    });
  };

  decrement = (id) => {
    const item = this.state.cart.find((product) => product.id === id);
    if (!item) return;

    if (item.count <= 1) {
      this.removeItem(id);
      return;
    }

    const tempCart = this.state.cart.map((product) => {
      if (product.id !== id) return product;
      const count = product.count - 1;
      return { ...product, count, total: count * product.price };
    });

    this.setState({ cart: tempCart }, () => {
      this.syncProductCounts(tempCart);
      this.addTotals();
      this.persistCart();
    });
  };

  syncProductCounts = (cart) => {
    const tempProducts = this.state.products.map((product) => {
      const cartItem = cart.find((item) => item.id === product.id);
      if (!cartItem) {
        return { ...product, inCart: false, count: 0, total: 0 };
      }
      return {
        ...product,
        inCart: true,
        count: cartItem.count,
        total: cartItem.total,
      };
    });
    this.setState({ products: tempProducts });
  };

  removeItem = (id) => {
    const tempCart = this.state.cart.filter((item) => item.id !== id);
    const tempProducts = this.state.products.map((product) => {
      if (product.id !== id) return product;
      return { ...product, inCart: false, count: 0, total: 0 };
    });

    this.setState({ cart: tempCart, products: tempProducts }, () => {
      this.addTotals();
      this.persistCart();
    });
  };

  clearCart = () => {
    localStorage.removeItem(CART_KEY);
    this.setProducts();
  };

  addTotals = () => {
    const subTotal = this.state.cart.reduce((sum, item) => sum + item.total, 0);
    const tax = parseFloat((subTotal * 0.1).toFixed(2));
    const total = subTotal + tax;

    this.setState({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total,
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetails: this.handleDetails,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
          getCartCount: this.getCartCount,
          getFilteredProducts: this.getFilteredProducts,
          setSearchQuery: this.setSearchQuery,
          setBrandFilter: this.setBrandFilter,
          setSortBy: this.setSortBy,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer, ProductContext };
