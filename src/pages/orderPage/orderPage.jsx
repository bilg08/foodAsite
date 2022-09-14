import * as React from "react";
// import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { SideBar } from "../../components/sideBar/sideBar";
import { NavBar } from "../../components/navbar/navbar";
import { styled, Box, Toolbar, Typography, Grid } from "@mui/material";
const drawerWidth = 240;
export const OrderPage = () => {
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
  const OrdersContainer= styled(Grid)(
    ({ theme }) => ({
      background: "green",
      width: `100%`,
      
    })
  );
  const OrdersDayByDayContainer = styled(Grid)(({ theme }) => ({
    background: "yellow",
    width: `100%`,
  }));
  const OrderByDay = styled(Grid)(({ theme }) => ({
    background: "darkblue",
    width: `20%`,
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
          <OrdersDayByDayContainer item container>
            <OrderByDay item>
                
            </OrderByDay>
          </OrdersDayByDayContainer>
        </OrdersContainer>
      </Box>
    </Box>
  );
};
