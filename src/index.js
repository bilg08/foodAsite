import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { FoodsContextProvider } from './context/foodsContext';
import { FoodsAddingContextProvider } from './context/foodsAddingContext';
import { SpinnerContextProvider } from './context/spinnerContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SpinnerContextProvider>
    <FoodsContextProvider>
      <FoodsAddingContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FoodsAddingContextProvider>
    </FoodsContextProvider>
  </SpinnerContextProvider>
);
