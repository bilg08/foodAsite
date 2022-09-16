import {OrderPage} from "./pages/OrderPage/orderPage"
import { ThemeProviderStyles } from "../src/themeProvider/theme";
import { Menu } from "./pages/Menu/Menu";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { auth } from "./firebaseForThisProject/firebase";
import { sendSignInLinkToEmail } from "firebase/auth"

import { useEffect, useState } from "react";

// import { useRef } from "react";
export const App = () => {
  // const email=useRef(null)
  // const actionCodeSettings = {
  //   url: "https://adminforfoodsite-6bc3f.web.app/Menu",
  //   handleCodeInApp: true,
  // };
  // const sendRequest = () => {
  //   const emailValue = email.current.value;
  //   sendSignInLinkToEmail(auth, emailValue, actionCodeSettings)
  //     .then(() => {
  //       window.localStorage.setItem("emailForSignIn", emailValue);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //     });
  // }
  return (
    <ThemeProviderStyles>
      <div className="App">
          <Routes>
            <Route path="/Menu" element={<Menu/> } />x
            <Route path="/" element={<OrderPage />} />
          </Routes>
      </div>
    </ThemeProviderStyles>
  );
};
