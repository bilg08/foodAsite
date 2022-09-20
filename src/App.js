import {OrderPage} from "./pages/OrderPage/orderPage"
import { ThemeProviderStyles } from "../src/themeProvider/theme";
import { Menu } from "./pages/Menu/Menu";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Graphic } from "./pages/graphic/graphic.jsx";
import SignUp from "./pages/userRegisteration/signUp";
import SignInSide from "./pages/userRegisteration/loginPage";
import { useIsAdminLoggedContext } from "./context/isAdminLoggedContext";

export const App = () => {
  const { isAdminLogged } = useIsAdminLoggedContext();
  return (
    <ThemeProviderStyles>
      <div className="App">
        {isAdminLogged === true ? (
          <Routes>
            <Route path={`/Menu`} element={<Menu />} />
            <Route path={`/Orders`} element={<OrderPage />} />
            <Route path={`/Graphic`} element={<Graphic />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<SignInSide />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        )}
      </div>
    </ThemeProviderStyles>
  );
};
