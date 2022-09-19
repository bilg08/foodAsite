import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { FoodsContextProvider } from './context/foodsContext';
import { FoodsAddingContextProvider } from './context/foodsAddingContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FoodsContextProvider>
    <FoodsAddingContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FoodsAddingContextProvider>
  </FoodsContextProvider>
);
