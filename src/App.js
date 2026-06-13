import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar';
import ProductList from './components/productList';
import Details from './components/details';
import Cart from './components/cart';
import Default from './components/Default';
import Modal from './components/modal';
import Footer from './components/footer';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className='store-main'>
          <Switch>
            <Route exact path='/' component={ProductList} />
            <Route path='/details/:id' component={Details} />
            <Route path='/cart' component={Cart} />
            <Route component={Default} />
          </Switch>
        </main>
        <Footer />
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
