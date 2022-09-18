import * as React from "react";
import { SideBar } from "../../components/sideBar/sideBar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Button,
} from "@mui/material";
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
import { useGetDatasFromArrayofDoc } from "../../customHook/getDatasFromDocsArray";

export const OrderPage = () => {
  const newOrders = useGetDatasFromArrayofDoc("ThisDayOrders");
  const shippedOrders = useGetDatasFromArrayofDoc("shippedOrders");


  const NewOrders = () => {
    const changeOrderTypeAsShipped = async (orderedDate, orderUid, orderData) => {
      await setDocToFirebase(
        `foodsOrders/${orderedDate}/shippedOrders/${orderUid}`,
        orderData
      );
      deleteDocOfFirebase(
        `foodsOrders/${orderedDate}/ThisDayOrders/${orderUid}`
      ).then(
        console.log(`foodsOrders/${orderedDate}/ThisDayOrders/${orderUid}`)
      );
    }

    return (
      <Grid sx={styles.newOrdersContainer}>
        <AOrdersHeader>
          <h3>Шинэ захиалга</h3>
        </AOrdersHeader>
        <OrdersContainer>
          {newOrders.length <= 0
            ? null
            : newOrders.map((newOrder, index) => {
                return (
                  <NewOrder key={index}>
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
                    {newOrder.orders.map((newOrderOrders,index) => {
                      return (
                        <Accordion key={index}>
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
                              {/* {newOrderOrders.orderedFoods.map(
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
                              )} */}
                            </Typography>
                            <Typography
                              sx={{ display: "flex", alignItems: "center" }}>
                              <LocationOnIcon sx={{ color: "#66B60F" }} />
                              <p>{newOrderOrders.destination}</p>
                            </Typography>
                            <Typography
                              sx={{ display: "flex", alignItems: "center" }}>
                              <PhoneIcon sx={{ color: "#66B60F" }} />
                              <p>{newOrderOrders.phoneNumber}</p>
                            </Typography>
                            <Button
                              onClick={() =>
                                changeOrderTypeAsShipped(
                                  newOrder.date,
                                  newOrderOrders.uid,
                                  newOrderOrders
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
        <AOrdersHeader>
          <h3>Хүргэгдсэн захиалга</h3>
        </AOrdersHeader>
        <OrdersContainer>
          {shippedOrders.length <= 0
            ? null
            : shippedOrders.map((shippedOrder, index) => {
                return (
                  <NewOrder key={`shippedOrder${index}`}>
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}>
                      <p>{shippedOrder.date}</p>
                      <Badge
                        badgeContent={
                          shippedOrder.orders.length === null
                            ? 0
                            : shippedOrder.orders.length
                        }
                        color="primary">
                        <InventoryIcon />
                      </Badge>
                    </Grid>
                    {shippedOrder.orders.map((shippedOrderOrders) => {
                      return (
                        <Accordion
                          key={`shippedOrderOrders${shippedOrderOrders}`}
                          sx={{
                            borderRadius: `10px`,
                            border: `1px solid #DFE0EB`,
                            borderRadius: `10px`,
                          }}>
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
                                      key={`orderedFood${orderedFood}`}
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-around",
                                      }}>
                                      <li sx={{ listStyle: "none" }}>
                                        {Object.keys(orderedFood)}:
                                        {Object.values(orderedFood)}
                                      </li>
                                    </ul>
                                  );
                                }
                              )}
                            </Typography>
                            <Typography
                              sx={{ display: "flex", alignItems: "center" }}>
                              <LocationOnIcon sx={{ color: "#66B60F" }} />
                              <p>{shippedOrderOrders.destination}</p>
                            </Typography>
                            <Typography
                              sx={{ display: "flex", alignItems: "center" }}>
                              <PhoneIcon sx={{ color: "#66B60F" }} />
                              <p>{shippedOrderOrders.phoneNumber}</p>
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