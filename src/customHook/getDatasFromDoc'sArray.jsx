import { useEffect, useState } from "react";
import { getDocsFromFireBase } from "../firebaseForThisProject/getDocs";
import { useGetDocsFromFireBase } from "./getDocsCustomHook";

export const useGetDatasFromArrayofDoc = (collectionName) => {
    const foodsOrders = useGetDocsFromFireBase("foodsOrders");
  const [data, setData] = useState([]);

  foodsOrders.map(async (foodOrder, foodOrderIndex) => {
    let subOrder = { date: "", orders: [] };
    subOrder.date = foodOrder.date;
  });

    const getDatas = async () => {
        
      foodsOrders[0].map(async (foodOrder, foodOrderIndex) => {
      let subOrder = { date: "", orders: [] };
          subOrder.date = foodOrder.date;
          console.log(data)
         try {
           const foodsOrdersDayByDay = await getDocsFromFireBase(
             `foodsOrders/${foodOrder.date}/${collectionName}`
           );
           foodsOrdersDayByDay.forEach((foodOrderDayByDay, index) => {
             subOrder.orders.push(foodOrderDayByDay.data());

      setData((prevVal) => {
            let prevValACopy = prevVal;
            prevValACopy = [...prevValACopy, subOrder];
            subOrder = {};
            return (prevVal = prevValACopy);
      });
           });
          } catch (error) { }
    });

    //   try {
    //     const foodsOrdersDayByDay = await getDocsFromFireBase(
    //       `foodsOrders/${foodOrder.date}/${collectionName}`
    //     );
    //     foodsOrdersDayByDay.forEach((foodOrderDayByDay, index) => {
    //       subOrder.orders.push(foodOrderDayByDay.data());

    //       setData((prevVal) => {
    //         let prevValACopy = prevVal;
    //         prevValACopy = [...prevValACopy, subOrder];
    //         subOrder = {};
    //         return (prevVal = prevValACopy);
    //       });
    //     });
    //   } catch (error) {}
    // };
    //   });
  };

  useEffect(() => {
    getDatas();
  }, []);
  return data;

  // setOrdersByDay((ordersByDay = []));
  // foodsOrders.map(async (foodOrder, foodOrderIndex) => {
  //   let subOrder = { date: "", orders: [] };
  //   subOrder.date = foodOrder.date;
  // try {
  //   const foodsOrdersDayByDay = await getDocsFromFireBase(
  //     `foodsOrders/${foodOrder.date}/ThisDayOrders`
  //   );
  //   foodsOrdersDayByDay.forEach((foodOrderDayByDay, index) => {
  //     subOrder.orders.push(foodOrderDayByDay.data());
  //   });
  // } catch (error) {}

  //   setOrdersByDay((prevVal) => {
  //     let prevValACopy = prevVal;
  //     prevValACopy = [...prevValACopy, subOrder];
  //     subOrder = {};
  //     return (prevVal = prevValACopy);
  //   });
  // });
};
