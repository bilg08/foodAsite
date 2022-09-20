import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { FoodsContextProvider } from './context/foodsContext';
import { SpinnerContextProvider } from './context/spinnerContext';
import { AgainGetDataContextProvider } from './context/getDataAgainContext';
import { IsAdminLoggedContextProvider } from './context/isAdminLoggedContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IsAdminLoggedContextProvider>
    <AgainGetDataContextProvider>
      <SpinnerContextProvider>
        <FoodsContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FoodsContextProvider>
      </SpinnerContextProvider>
    </AgainGetDataContextProvider>
  </IsAdminLoggedContextProvider>
);
