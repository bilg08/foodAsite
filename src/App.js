import {OrderPage}from'./pages/orderPage/orderPage'
import { ThemeProviderStyles } from "../src/themeProvider/theme";
import { Menu } from "./pages/Menu/Menu";
import { Route, Routes } from "react-router-dom";

let _ = require("lodash")
export const App = () => {
//   const arr = [1, 2, 3];
//   function num5(el) {
//     return el+5
//   }
//  console.log(_.map(arr, num5));
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
