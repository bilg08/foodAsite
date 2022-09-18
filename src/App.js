import {OrderPage} from "./pages/OrderPage/orderPage.jsx"
import { ThemeProviderStyles } from "../src/themeProvider/theme";
import { Menu } from "./pages/Menu/Menu";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { auth } from "./firebaseForThisProject/firebase";
import { sendSignInLinkToEmail } from "firebase/auth"

import { useEffect, useState } from "react";
import { Graphic } from "./pages/graphic/graphic.jsx";

export const App = () => {
  return (
    <ThemeProviderStyles>
      <div className="App">
          <Routes>
            <Route path="/Menu" element={<Menu/> } />
          <Route path="/" element={<OrderPage />} />
          <Route path="/graphic" element={ <Graphic/>} />
          </Routes>
      </div>
    </ThemeProviderStyles>
  );
};
