import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import CategoryStore from './store/CategoryStore';
import ProductStore from './store/ProductsStore';
import OrderStore from './store/OrderStore';
import ProductOrderStore from './store/ProductOrderStore';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    category: new CategoryStore(),
    product: new ProductStore(),
    order: new OrderStore(),
    productOrder: new ProductOrderStore(),
  }}>

    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
reportWebVitals();
