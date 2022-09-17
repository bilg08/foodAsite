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
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { getDocsFromFireBase } from "../../firebaseForThisProject/getDocs";
import { useGetDocsFromFireBase } from "../../customHook/getDocsCustomHook";
import InventoryIcon from "@mui/icons-material/Inventory";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { setDocToFirebase } from "../../firebaseForThisProject/setDoc";
import { deleteDocOfFirebase } from "../../firebaseForThisProject/deleteDoc";
import {
  styles,
  AOrdersHeader,
  OrdersContainer,
  ShippedOrder,
  NewOrder,
} from "./styles.jsx";
import { useGetDatasFromArrayofDoc } from "../../customHook/getDatasFromDoc'sArray";

export const OrderPage = () => {
  const newOrders = useGetDatasFromArrayofDoc("ThisDayOrders");
  const shippedOrders = useGetDatasFromArrayofDoc("orderedOrders");


  const NewOrders = () => {
    const changeOrderTypeAsShipped = async (orderedDate, orderUid, orderData) => {
      await setDocToFirebase(`foodsOrders/${orderedDate}/orderedOrders/${orderUid}`, orderData);
      deleteDocOfFirebase(
        `foodsOrders/${orderedDate}/ThisDayOrders/${orderUid}`
      ).then(
        console.log(`foodsOrders/${orderedDate}/ThisDayOrders/${orderUid}`)
      );
    }

    return (
      <Grid sx={styles.newOrdersContainer}>
        <AOrdersHeader>Шинэ захиалга</AOrdersHeader>
        <OrdersContainer>
          {newOrders.map((newOrder, index) => {
            return (
              <NewOrder>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}>
                  <p>{newOrder.date}</p>
                  <Badge badgeContent={newOrder.orders.length} color="primary">
                    <InventoryIcon />
                  </Badge>
                </Grid>
                {newOrder.orders.map((newOrderOrders) => {
                  return (
                    <Accordion>
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
                          <p>{newOrderOrders.uid}</p>
                          <p>{newOrderOrders.when}</p>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: `100%`,
                          }}>
                          {newOrderOrders.orderedFoods.map((orderedFood) => {
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
                          <p>{newOrderOrders.destination}</p>
                        </Typography>
                        <Button
                          onClick={() =>
                            changeOrderTypeAsShipped(
                              newOrder.date,newOrderOrders.uid,newOrderOrders
                            )
                          }
                          sx={{
                            width: `108px`,
                            background: " #66B60F",
                            borderRadius: `10px`,
                            color: "white",
                            height: `32px`,
                          }}>
                          Хүргэгдсэн
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </NewOrder>
            );
          })}
        </OrdersContainer>
      </Grid>
    );
  };

  const ShippedOrders = () => {
    return (
      <Grid sx={styles.shippedOrdersContainer}>
        <AOrdersHeader>Хүргэгдсэн захиалга</AOrdersHeader>
        <OrdersContainer>
          {shippedOrders.map((shippedOrder, index) => {
            return (
              <NewOrder>
                <Grid sx={{display: "flex",alignItems: "center",justifyContent: "space-around",}}>
                  <p>{shippedOrder.date}</p>
                  <Badge
                    badgeContent={shippedOrder.orders.length}
                    color="primary">
                    <InventoryIcon />
                  </Badge>
                </Grid>
                {shippedOrder.orders.map((shippedOrderOrders) => {
                  return (
                    <Accordion>
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
                          <p>{shippedOrderOrders.uid}</p>
                          <p>{shippedOrderOrders.when}</p>
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}>
                          {shippedOrderOrders.orderedFoods.map(
                            (orderedFood) => {
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
                            }
                          )}
                        </Typography>
                        <Typography sx={{ display: "flex"}}>
                          <p>{shippedOrderOrders.destination}</p>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </NewOrder>
            );
          })}
        </OrdersContainer>
      </Grid>
    );
  };



  
  return (
    <Grid container>
      <SideBar />
      <Grid item container sx={styles.AllOrdersContainer}>
        <NewOrders />
        <ShippedOrders />
      </Grid>
    </Grid>
  );
};