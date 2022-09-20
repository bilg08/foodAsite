import { useContext, createContext,useState } from 'react';
import {v4 as uuidv4} from 'uuid'
const pathsNavigate = {
  home: `/${uuidv4()}/home`,
  graphic: `/${uuidv4()}/graphic`,
  login: "/",
  signUp: "/",
  orders: `/${uuidv4()}/orders`,
};
const IsAdminLoggedContext=createContext();
export const IsAdminLoggedContextProvider = ({ children }) => {
const [navigationPath, setPath] = useState(pathsNavigate);
    return (
      <IsAdminLoggedContext.Provider value={{navigationPath}}>
        {children}
      </IsAdminLoggedContext.Provider>
    );
}
export const useIsAdminLoggedContext=()=>useContext(IsAdminLoggedContext)