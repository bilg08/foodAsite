import { useEffect, useState } from "react";
import { getDocsFromFireBase } from "../firebaseForThisProject/getDocs";

export const useGetAllOrdersDetails = () => {
    const [count,setCount]=useState(0)
    const [data, setData] = useState({
        totalProfit: 0,
        ordersLength:0,
        shippedOrderslength: 0,
        returnedOrdersLength: 0,
        ordersDayByDayOrdersLength: [],
        ordersDateArray: [],
        ordersDataArray:[]
    });
    const getData = async () => {
        setCount(0)
        setData({
          totalProfit: 0,
          ordersLength: 0,
          shippedOrderslength: 0,
          returnedOrdersLength: 0,
          ordersDateArray: [],
          ordersDataArray: [],
        });
        try {
          const ordersOfFoods = await getDocsFromFireBase('foodsOrders');
          let counter = 0;
          ordersOfFoods.forEach(async (order) => {
              
              setData(prevVal => {
                let prevValACopy = prevVal;
                prevValACopy.ordersDateArray = [
                  ...prevValACopy.ordersDateArray,
                  order.data().date,
                ];
                return(prevValACopy)
              })


                try {
                  const getAllOrderLength = await getDocsFromFireBase(
                    `foodsOrders/${order.data().date}/ThisDayOrders`
                  );
                  const getAllShippedOrderLength = await getDocsFromFireBase(
                    `foodsOrders/${order.data().date}/shippedOrders`
                  );
                    getAllShippedOrderLength.forEach((order) => {
                        setData((prevVal) => {
                      let prevValACopy = prevVal;
                      prevValACopy.shippedOrderslength++;
                      return (prevVal = prevValACopy);
                        });
                  });
                  getAllOrderLength.forEach((order) => {
                    // subOrder[1]++;
                    setData((prevVal) => {
                      let prevValACopy = prevVal;
                      counter++
                      prevValACopy.ordersLength++;
                      return (prevVal = prevValACopy);
                    });
                  });
                } catch (error) {}
                




              /*************************************************************************** */
                    //Get Total Price by this action
                    setData((prevVal) => {
                        let prevValACopy = prevVal;
                        prevValACopy.totalProfit += order.data().totalProfit;
                        return (prevVal = prevValACopy);
                    });
                /*************************************************************************** */
                
                setCount((prevVal) => {
                  let prevValACopy = prevVal;
                  prevValACopy++;
                  return prevValACopy;
                });
                setData(prevVal => {
                  let prevValACopy = prevVal;
                    prevValACopy.ordersDataArray = [
                      ...prevValACopy.ordersDataArray,counter

                    ];
                  counter = 0;
                  console.log(prevValACopy)
                    return(prevValACopy)
                })
              
            })
    } catch (error) {}
    }
    useEffect(() => {
        getData();
    }, [])
    return data
    
}