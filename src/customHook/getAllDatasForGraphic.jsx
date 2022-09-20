import { useEffect, useState } from "react";
import { getDocsFromFireBase } from "../firebaseForThisProject/getDocs";

export const useGetAllOrdersDetails = () => {
    const [count,setCount]=useState(0)
    const [data, setData] = useState({});
    const getData = async () => {
      setCount(0)
      setData({
        //Нийт орлого
        totalProfit: 0,
        //Захиалга нийт захиалганы хэмжээ
        ordersLength: 0,
        //Хүргэсэн Нийт хүргэгдэсэн захиалганы хэмжээ
        shippedOrderslength: 0,
        //Буцаагдсан Нийт хүргэгдэсэн захиалганы хэмжээ
        returnedOrdersLength: 0,
        //graphic ашиглах үед graphic-д label хэрэгтэй тэр нь array байдаг
        ordersDateArray: [],
        //graphic ашиглах үед graphic-д дата хэрэгтэй тэр нь array байдаг
        ordersDataArray: [],
      });
        try {
          const ordersOfFoods = await getDocsFromFireBase('foodsOrders');
          let counter = 0;

          ordersOfFoods.forEach(async (order) => {
            //ordersDateArray-руу foodsOrders collection-д байгаа 
            //өдрүүдийг push хийнэ
            setData((prevVal) => {
              let prevValACopy = prevVal;
              prevValACopy.ordersDateArray = [
                ...prevValACopy.ordersDateArray,
                order.data().date,
              ];
              return prevValACopy;
            });

            try {
              const getAllOrdersLength = await getDocsFromFireBase(
                `foodsOrders/${order.data().date}/ThisDayOrders`
              );
              const getAllShippedOrderLength = await getDocsFromFireBase(
                `foodsOrders/${order.data().date}/shippedOrders`
              );
              getAllShippedOrderLength.forEach((order) => {
                //shippedOrderslength-руу хүргэгдсэн захиалганы уртыг нэмнэ
                setData((prevVal) => {
                  let prevValACopy = prevVal;
                  prevValACopy.shippedOrderslength++;
                  return (prevVal = prevValACopy);
                });
              });
              getAllOrdersLength.forEach((order) => {
                //ordersLength-руу тухайн өдөрт ирсэн захиалганы уртыг нэмнэ
                setData((prevVal) => {
                  let prevValACopy = prevVal;
                  counter++;
                  prevValACopy.ordersLength++;
                  return (prevVal = prevValACopy);
                });
              });
            } catch (error) {}

            /*************************************************************************** */
            //Get Total Price by this action
            setData((prevVal) => {
              //Нийт ашигийг нэмнэ
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
            setData((prevVal) => {
              //хэдны өдөр болон тухайн өдрийн захиалганы уртыг хадгалана.
              //жишээ нь ['2022-09-01',2]
              let prevValACopy = prevVal;
              prevValACopy.ordersDataArray = [
                ...prevValACopy.ordersDataArray,
                counter,
              ];
              counter = 0;
              return prevValACopy;
            });
          })
    } catch (error) {}
    }
    useEffect(() => {
        getData();
    }, [])
    return data
    
}