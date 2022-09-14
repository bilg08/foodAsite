import {OrderPage} from './pages/OrderPage/orderPage'
import { ThemeProviderStyles } from "../src/themeProvider/theme";
import { Menu } from "./pages/Menu/Menu";
import { Route, Routes } from "react-router-dom";
import './App.css'
export const App = () => {

  return (

    <ThemeProviderStyles>
      <div className="App">
          <Routes>
            <Route path="/Menu" element={<Menu/> } />
            <Route path="/" element={<OrderPage />} />
          </Routes>
      </div>
    </ThemeProviderStyles>
  );
};
