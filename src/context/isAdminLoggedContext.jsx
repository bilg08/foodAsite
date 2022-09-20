import { useContext, createContext,useState } from 'react';

const IsAdminLoggedContext=createContext();
export const IsAdminLoggedContextProvider = ({ children }) => {
  const [isAdminLogged, setIsAdminLogged] = useState(false)
    return (
      <IsAdminLoggedContext.Provider
        value={{ isAdminLogged, setIsAdminLogged }}>
        {children}
      </IsAdminLoggedContext.Provider>
    );
}
export const useIsAdminLoggedContext=()=>useContext(IsAdminLoggedContext)