import * as React from "react";
// import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { SideBar } from "../../components/sideBar/sideBar";
import { NavBar } from "../../components/navbar/navbar";
import { styled, Box, Toolbar, Typography, Grid, Accordion, AccordionSummary, AccordionDetails, Badge, Button, CircularProgress } from "@mui/material";
import { getDocsFromFireBase } from "../../firebaseForThisProject/getDocs";
import { useGetDocsFromFireBase } from "../../firebaseForThisProject/getDocsCustomHook";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useOrdersByCustomHook } from "./getOrderByCustomHook";
const drawerWidth = 240;
export const OrderPage = () => {
    
  let [foodsOrders, setFoodsOrders] = useGetDocsFromFireBase("foodsOrders");

  console.log(foodsOrders)
  let [ordersByDay, setOrdersByDay] = React.useState([]);
  React.useEffect(() => {
    getOrderDayByDayFromFirebase();
  }, [foodsOrders]);

  async function getOrderDayByDayFromFirebase() {
    setOrdersByDay(ordersByDay=[])
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
      } catch (error) { }
     
      

      setOrdersByDay(prevVal => {
        let prevValACopy = prevVal;
        prevValACopy = [...prevValACopy, subOrder];
        subOrder = {};
        return (prevVal = prevValACopy)
      })

      
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
    width: `auto`,
    height: `90%`,
    position: "absolute",
    top: `15%`,
    background: `#F5F5F7`,
  }));
  const OrdersDayByDayContainer = styled(Grid)(({ theme }) => ({
    width: `auto`,
    height: `65%`,
    display: 'flex',
    alignItems: 'center',
    gap: `10px`,
    overflow: `scroll`,
    background:'red'
  }));
  const OrderByDay = styled(Grid)(({ theme }) => ({
    minWidth: `300px`,
    height: `100%`,
    overflow:'scroll'
  }));
  const OrderByDayHeader = styled(Grid)(({ theme }) => ({
    background: "darkblue",
    width: `100%`,
    height: `48px`,
    background: ` #FFFFFF`,
    border: `1px solid #DFE0EB`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color:`#A0A2A8`
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
          <OrdersDayByDayContainer item>
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

                    {order.orders.map((oneOrder) => {
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
                          <Button
                            sx={{
                              width: `108px`,
                              background: " #66B60F",
                              borderRadius: `10px`,
                              color: "white",
                              height: `32px`,
                            }}
                          >
                            Захиалга
                          </Button>
                        </Accordion>
                      );
                    })}
                  </OrderByDay>
                );
                // console.log(order,'order')
                //   const ordersDayByDay = getDocsFromFireBase(`foodsOrders/${order.date}/ThisDayOrders`);
                //   ordersDayByDay.then((res)=>res.forEach(item=>{console.log(item,'item')}))
              })
            )}
          </OrdersDayByDayContainer>
        </OrdersContainer>
      </Box>
    </Box>
  );
};
 

