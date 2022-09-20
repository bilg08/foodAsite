import {OrderPage} from "./pages/orderPage/orderPage"
import { ThemeProviderStyles } from "../src/themeProvider/theme";
import { Menu } from "./pages/Menu/Menu";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Graphic } from "./pages/graphic/graphic.jsx";
import SignUp from "./pages/userRegisteration/signUp";
import SignInSide from "./pages/userRegisteration/loginPage";
import { useIsAdminLoggedContext } from "./context/isAdminLoggedContext";

export const App = () => {
  const { navigationPath } = useIsAdminLoggedContext();
  console.log(navigationPath)
  return (
    <ThemeProviderStyles>
      <div className="App">
        <Routes>
          <Route path={`/`} element={<Menu />} />
          <Route path={`${navigationPath.orders}`} element={<OrderPage />} />
          <Route path={`${navigationPath.graphic}`} element={<Graphic />} />
          <Route path="/login" element={<SignInSide />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </ThemeProviderStyles>
  );
};
