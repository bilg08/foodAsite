import * as React from "react";
import { SideBar } from "../../components/sideBar/sideBar";
import { NavBar } from "../../components/navbar/navbar";
import {
  styled,
  Box,
  Toolbar,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { getDocsFromFireBase } from "../../firebaseForThisProject/getDocs";
import { useGetDocsFromFireBase } from "../../firebaseForThisProject/getDocsCustomHook";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setDocToFirebase } from "../../firebaseForThisProject/setDoc";
import { deleteDocOfFirebase } from "../../firebaseForThisProject/deleteDoc";
const drawerWidth = 240;
export const OrderPage = () => {
  const [orderType, setOrderType] = React.useState("Хүргэгдээгүй");
  let [foodsOrders, setFoodsOrders] = useGetDocsFromFireBase("foodsOrders");
  let [ordersByDay, setOrdersByDay] = React.useState([]);
  let [orderedOrdersByDay, setOrderedOrdersByDay] = React.useState([]);
  const handleChange = (event, date, orderUid, order, oneOrderIndex) => {
    let subOrder = order.orders[oneOrderIndex];
    subOrder.isOrdered = true;
    let val = event.target.value;
    setOrderType(async (prevVal) => {
      let prevValACopy = prevVal;
      prevValACopy = val;
      if (val === "Хүргэгдсэн") {
        console.log(`foodsOrders/${date}/ThisDayOrders/${orderUid}`);
        await setDocToFirebase(
          `foodsOrders/${date}/ThisDayOrders/${orderUid}`,
          subOrder
        );
        await deleteDocOfFirebase(
          `foodsOrders/${date}/ThisDayOrders/${orderUid}`
        ).then(console.log("ustgalaa"));
        await setDocToFirebase(
          `foodsOrders/${date}/orderedOrders/${orderUid}`,
          subOrder
        );
      }
      return val;
    });
  };
  React.useEffect(() => {
    getOrderDayByDayFromFirebase();
    getOrderedOrderDayByDayFromFirebase();
  }, [foodsOrders]);

  async function getOrderDayByDayFromFirebase() {
    setOrdersByDay((ordersByDay = []));
    foodsOrders.map(async (foodOrder, foodOrderIndex) => {
      let subOrder = { date: "", orders: [] };
      subOrder.date = foodOrder.date;
      try {
        const foodsOrdersDayByDay = await getDocsFromFireBase(
          `foodsOrders/${foodOrder.date}/ThisDayOrders`
        );
        foodsOrdersDayByDay.forEach((foodOrderDayByDay, index) => {
          subOrder.orders.push(foodOrderDayByDay.data());
        });
      } catch (error) {}

      setOrdersByDay((prevVal) => {
        let prevValACopy = prevVal;
        prevValACopy = [...prevValACopy, subOrder];
        subOrder = {};
        return (prevVal = prevValACopy);
      });
    });
  }
  async function getOrderedOrderDayByDayFromFirebase() {
    setOrdersByDay((ordersByDay = []));
    foodsOrders.map(async (foodOrder, foodOrderIndex) => {
      let subOrder = { date: "", orders: [] };
      subOrder.date = foodOrder.date;
      try {
        const foodsOrdersDayByDay = await getDocsFromFireBase(
          `foodsOrders/${foodOrder.date}/orderedOrders`
        );
        foodsOrdersDayByDay.forEach((foodOrderDayByDay, index) => {
          subOrder.orders.push(foodOrderDayByDay.data());
        });
      } catch (error) {}

      setOrderedOrdersByDay((prevVal) => {
        let prevValACopy = prevVal;
        prevValACopy = [...prevValACopy, subOrder];
        subOrder = {};
        return (prevVal = prevValACopy);
      });
    });
  }

  const styles = {
    DrawerTop: (theme) => ({
      width: `80%`,
      height: `auto`,
      border: `1px solid silver`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: "white",
      marginTop: "25%",
    }),
    button: (theme) => ({
      color: "white",
      "&:active": {
        background: "linear-gradient(#5aff15,#00b712)",
        transition: "0.3s",
      },
    }),
  };
  const OrdersContainer = styled(Grid)(({ theme }) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    height: `auto`,
    position: "absolute",
    top: `15%`,
    background: `#F5F5F7`,
    display: "flex",
    flexDirection: "column",
  }));
  const OrdersDayByDayContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
    gap: `10px`,
    overflow: `scroll`,
    background: "red",
  }));
  const OrderedOrdersDayByDayContainer = styled(Grid)(({ theme }) => ({
    width: `auto`,
    display: "flex",
    gap: `10px`,
    overflow: `scroll`,
    background: "red",
  }));
  const OrderByDay = styled(Grid)(({ theme }) => ({
    minWidth: `300px`,
    height: `100%`,
    overflow: "scroll",
    background: `green`,
  }));
  const OrderByDayHeader = styled(Grid)(({ theme }) => ({
    background: "darkblue",
    width: `auto`,
    height: `48px`,
    background: ` #FFFFFF`,
    border: `1px solid #DFE0EB`,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    color: `#A0A2A8`,
  }));
  return (
    <Box sx={{ display: "flex" }}>
      <NavBar name="Захиалга" days="true" />
      <SideBar />
      <Box
        component="main"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <OrdersContainer container>
          {/* <OrdersDayByDayContainer item>
            <h1>Ирсэн захиалга </h1>
            {ordersByDay.length <= 0 ? (
              <CircularProgress />
            ) : (
              ordersByDay.map((order, index) => {
                return (
                  <OrderByDay item>
                    <OrderByDayHeader>
                      <p style={{ color: "black", fontSize: `16px` }}>
                        {order.date}
                      </p>
                      <Badge badgeContent={order.orders.length} color="primary">
                        <InventoryIcon />
                      </Badge>
                    </OrderByDayHeader>

                    {order.orders.map((oneOrder, oneOrderIndex) => {
                      return (
                        <Accordion sx={{ width: `100%` }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography
                              sx={{
                                display: "flex",
                                width: `100%`,
                                justifyContent: `space-around`,
                              }}
                            >
                              <p>{oneOrder.uid}</p>
                              <p>{oneOrder.when}</p>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: `100%`,
                              }}
                            >
                              {oneOrder.orderedFoods.map((orderedFood) => {
                                return (
                                  <ul
                                    sx={{
                                      display: "flex",
                                    }}
                                  >
                                    <li>
                                      {Object.keys(orderedFood)}:
                                      {Object.values(orderedFood)}
                                    </li>
                                  </ul>
                                );
                              })}
                            </Typography>
                            <Typography sx={{ display: "flex", width: `100%` }}>
                              <p>{oneOrder.destination}</p>
                            </Typography>
                          </AccordionDetails>
                          <Select
                            value={orderType}
                            onChange={(e) =>
                              handleChange(
                                e,
                                order.date,
                                oneOrder.uid,
                                order,
                                oneOrderIndex
                              )
                            }
                          >
                            <MenuItem
                              value="Хүргэгдээгүй"
                              sx={{
                                width: `108px`,
                                background: " #66B60F",
                                borderRadius: `10px`,
                                color: "white",
                                height: `32px`,
                              }}
                            >
                              Хүргэгдээгүй
                            </MenuItem>
                            <MenuItem
                              value="Хүргэгдсэн"
                              sx={{
                                width: `108px`,
                                background: " #66B60F",
                                borderRadius: `10px`,
                                color: "white",
                                height: `32px`,
                              }}
                            >
                              Хүргэгдсэн
                            </MenuItem>
                          </Select>
                        </Accordion>
                      );
                    })}
                  </OrderByDay>
                );
              })
            )}
          </OrdersDayByDayContainer> */}

          {/* <OrderedOrdersDayByDayContainer item>
            <h1>Хүргэгдсэн захиалга</h1>
            {orderedOrdersByDay.length <= 0 ? (
              <CircularProgress />
            ) : (
              orderedOrdersByDay.map((order, index) => {
                return (
                  <OrderByDay item>
                    <OrderByDayHeader>
                      <p style={{ color: "black", fontSize: `16px` }}>
                        {order.date}
                      </p>
                      <Badge badgeContent={order.orders.length} color="primary">
                        <InventoryIcon />
                      </Badge>
                    </OrderByDayHeader>

                    {order.orders.map((oneOrder, oneOrderIndex) => {
                      return (
                        <Accordion sx={{ width: `100%` }}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography
                              sx={{
                                display: "flex",
                                width: `100%`,
                                justifyContent: `space-around`,
                              }}>
                              <p>{oneOrder.uid}</p>
                              <p>{oneOrder.when}</p>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                width: `100%`,
                              }}>
                              {oneOrder.orderedFoods.map((orderedFood) => {
                                return (
                                  <ul
                                    sx={{
                                      display: "flex",
                                    }}>
                                    <li>
                                      {Object.keys(orderedFood)}:
                                      {Object.values(orderedFood)}
                                    </li>
                                  </ul>
                                );
                              })}
                            </Typography>
                            <Typography sx={{ display: "flex", width: `100%` }}>
                              <p>{oneOrder.destination}</p>
                            </Typography>
                          </AccordionDetails>
                         
                        </Accordion>
                      );
                    })}
                  </OrderByDay>
                );
              })
            )}
          </OrderedOrdersDayByDayContainer> */}
        </OrdersContainer>
      </Box>
    </Box>
  );
};
