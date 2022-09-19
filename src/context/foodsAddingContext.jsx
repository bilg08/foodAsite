import { createContext, useContext, useState } from "react";
// import { setDocToFirebase } from "../firebaseForThisProject/setDoc";
export const FoodsAddingContext = createContext();
export const FoodsAddingContextProvider = ({ children }) => {
  const [addedFoods, setAddedFoods] = useState({
    name: "",
    detail: "",
    price: "",
    img: "",
  });
  const takeUserInput = (e) => {
    setAddedFoods({ ...addedFoods, [e.target.name]: e.target.value });
  };


  return (
    <FoodsAddingContext.Provider
      value={{
        // foodsDatas,
        addedFoods,
        setAddedFoods,
        takeUserInput,
        // takeUserOrder,
      }}>
      {children}
    </FoodsAddingContext.Provider>
  );
};
export const useFoodsAddingContext = () => useContext(FoodsAddingContext);
