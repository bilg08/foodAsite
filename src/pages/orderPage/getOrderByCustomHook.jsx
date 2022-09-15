import { useGetDocsFromFireBase } from "../../firebaseForThisProject/getDocsCustomHook";
import { getDocsFromFireBase } from "../../firebaseForThisProject/getDocs";
import { useEffect, useState } from "react";

export const useOrdersByCustomHook = () => {
      let [foodsOrders, setFoodsOrders] = useGetDocsFromFireBase("foodsOrders");

  const [ordersByDay, setOrdersByDay] = useState([]);

    const getData = async () => {
      await console.log(foodsOrders, foodsOrders);
  };

  useEffect(() => {
    getData();
  }, []);
};

//   const getData = async () => {
//     await foodsOrders.map(async (foodOrder, foodOrderIndex) => {
//       let subOrder = { date: "", orders: [] };
//       subOrder.date = foodOrder.date;

//       try {
//         const foodsOrdersDayByDay = await getDocsFromFireBase(
//           `foodsOrders/${foodOrder.date}/ThisDayOrders`
//         );
//         foodsOrdersDayByDay.forEach((foodOrderDayByDay, index) => {
//           console.log(foodOrderDayByDay.data());
//           subOrder.orders.push(foodOrderDayByDay.data());
//         });
//       } catch (error) {}

//       setOrdersByDay((prevVal) => {
//         let prevValACopy = prevVal;
//         prevValACopy = [...prevValACopy, subOrder];
//         subOrder = {};
//         return (prevVal = prevValACopy);
//       });
//     });
//   };
