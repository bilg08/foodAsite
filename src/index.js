import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { FoodsContextProvider } from './context/foodsContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FoodsContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FoodsContextProvider>
);
