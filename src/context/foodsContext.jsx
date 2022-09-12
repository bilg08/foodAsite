import { createContext, useContext, useState } from "react";
import { useGetDocsFromFireBase } from "../firebaseForThisProject/getDocs";
import { setDocToFirebase } from "../firebaseForThisProject/setDoc";
import { foods } from "../asset/restaurantMenu";
export const FoodsContext = createContext();
export const FoodsContextProvider = ({ children }) => {
    const [foodsDatas] = useGetDocsFromFireBase("foods");
    
  return (
    <FoodsContext.Provider
      value={
        {
          foodsDatas,
        }
      }>
      {children}
    </FoodsContext.Provider>
  );
};
export const useFoodsDatasContext = () => useContext(FoodsContext);
