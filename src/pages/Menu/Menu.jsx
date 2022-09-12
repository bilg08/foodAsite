import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import { useFoodsDatasContext } from "../../context/foodsContext";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Grid,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import logo from "../../asset/Logo.png";
import { Link } from "react-router-dom";
import { SideBar } from "../../components/sideBar/sideBar";
import { AddNewFood } from "../../components/addNewFood/addNewFood";

const drawerWidth = 240;

export const Menu = () => {
    const { foodsDatas } = useFoodsDatasContext();
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

    container: (theme) => ({
      width: `calc(100% - ${drawerWidth}px)`,
      height: `100vh`,
      background: "#F5F5F7",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      color: "black",
    }),
    food: (theme) => ({
      color: "black",
      width: `220px`,
      height: `340px`,
      display: "flex",
      background: "transparent",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    }),
    foodBtn: (theme) => ({
      color: "#66B60F",
        background: "pink",
      zIndex:1
    }),
    addFoodBtn: (theme) => ({
      color: "white",
        background: "#66B60F",
    }),

    addFoodLogo: (theme) => ({
      color: "white",
      width: `130px`,
      height: `138px`,
      borderRadius: `100%`,
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: 50,
      background: "#66B60F",
    }),
    foodImg: (theme) => ({
      color: "white",
      width: `130px`,
      height: `138px`,
      borderRadius: `100%`,
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: 50,
    }),
    foodAboutContainer: (theme) => ({
      boxSizing: `borderBox`,
      position: `absolute`,
      width: `180px`,
      height: "230px",
      bottom: "0",
      background: `#FFFFFF`,
      border: `1px solid rgba(0, 7, 35, 0.08)`,
      borderRadius: `10px`,
    }),
  };
  return (
    <Box sx={{ display: "flex", background: "red" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Хоолны цэс
          </Typography>
        </Toolbar>
      </AppBar>
      <SideBar />

      <Grid container sx={styles.container}>
        <Grid item sx={styles.food}>
          <Card sx={styles.food}>
            <Fab sx={styles.addFoodLogo}>
              <RestaurantMenuIcon />
            </Fab>
            <CardContent sx={styles.foodAboutContainer}>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  position: "absolute",
                  width: "100%",
                  bottom: 0,
                  left: `0%`,
                }}
                component="div">
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: `100%`,
                    position: "relative",
                    flexDirection: "column",
                  }}>
                  <h1>Шинэ хоол нэмэх</h1>
                  <Fab sx={styles.addFoodBtn} size="small">
                    +
                  </Fab>
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {foodsDatas.map((food, index) => {
          return (
            <Grid key={index} item sx={styles.food}>
              <Card sx={styles.food}>
                <CardMedia src={food.img} sx={styles.foodImg} component="img" />
                <CardContent sx={styles.foodAboutContainer}>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      position: "absolute",
                      width: "100%",
                      bottom: 0,
                      left: `0%`,
                    }}
                    component="div">
                    <h4>{food.name}</h4>
                    <p style={{ color: "#A0A2A8" }}>Порц 1</p>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: `100%`,
                        position: "relative",
                      }}>
                      <p>{food.price}Төг</p>
                      <Fab sx={styles.foodBtn} size="small">
                        -
                      </Fab>
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
        <AddNewFood />
      </Grid>
    </Box>
  );
};
