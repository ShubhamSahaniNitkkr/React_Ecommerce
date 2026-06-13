import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductProvider } from './context';
import getBasename from './getBasename';

ReactDOM.render(
  <ProductProvider>
    <Router basename={getBasename()}>
      <App />
    </Router>
  </ProductProvider>,
  document.getElementById('root')
);
