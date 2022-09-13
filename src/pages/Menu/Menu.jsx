import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFoodsDatasContext } from "../../context/foodsContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  Card,
  CardContent,
  CardMedia,
  Fab,
  Grid,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { SideBar } from "../../components/sideBar/sideBar";
import { AddNewFood } from "../../components/addNewFood/addNewFood";
import { NavBar } from "../../components/navbar/navbar";

const drawerWidth = 240;


export const Menu = () => {
  const { foodsDatas } = useFoodsDatasContext(false);
  const [isAddNewFoodFormOpen,setIsAddNewFoodFormOpen]=React.useState()
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
      width: `300px`,
      height: `420px`,
      display: "flex",
      background: "transparent",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    }),
    addFoodBtn: (theme) => ({
      color: "white",
      background: "#66B60F",
    }),

    addFoodLogo: (theme) => ({
      color: "white",
      width: `150px`,
      height: `158px`,
      borderRadius: `100%`,
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: `25%`,
      background: "#66B60F",
    }),
    foodImg: (theme) => ({
      color: "white",
      width: `150px`,
      height: `158px`,
      borderRadius: `100%`,
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: `25%`,
    }),
    foodAboutContainer: (theme) => ({
      boxSizing: `borderBox`,
      position: `absolute`,
      width: `85%`,
      height: "300px",
      bottom: "0",
      border: `1px solid rgba(0, 7, 35, 0.08)`,
      borderRadius: `10px`,
      background: "white",
    }),
    mainFoodDetailsContainer: (theme) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "absolute",
      width: "100%",
      height: "80%",
      bottom: 0,
      left: `0%`,
      fontSize: `18px`,
    }),
    AddNewFoodContainer: (theme) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "absolute",
      width: "100%",
      height: "80%",
      bottom: 0,
      left: `0%`,
    }),
    addNewFoodMain: (theme) => ({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: `100%`,
      position: "relative",
      flexDirection: "column",
    }),
  };
  return (
    <Grid sx={{ display: "flex", background: "red" }}>
      <NavBar name="Меню" />
      <SideBar />

      <Grid container sx={styles.container}>
        <Grid item sx={styles.food}>
          <Card sx={styles.food}>
            <Fab sx={styles.addFoodLogo}>
              <RestaurantMenuIcon />
            </Fab>
            <CardContent sx={styles.foodAboutContainer}>
              <Typography sx={styles.AddNewFoodContainer} component="div">
                <Box sx={styles.addNewFoodMain}>
                  <h1>Шинэ хоол нэмэх</h1>
                  <Fab
                    onClick={() => setIsAddNewFoodFormOpen(true)}
                    sx={styles.addFoodBtn}
                    size="medium"
                  >
                    <AddIcon />
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
                    sx={styles.mainFoodDetailsContainer}
                    component="div"
                  >
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: `100%`,
                        position: "relative",
                        width: `90%`,
                        flexDirection: "column",
                        fontSize: `18px`,
                      }}
                    >
                      <h2>{food.name}</h2>
                      <p>{`Порц${food.portion}`}</p>
                      <Box
                        sx={{
                          width: `100%`,
                          display: "flex",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <h3>{food.price}₮</h3>
                        <Fab sx={styles.addFoodBtn} size="medium">
                          <RemoveIcon />
                        </Fab>
                      </Box>
                    </Box>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <AddNewFood value={{isAddNewFoodFormOpen,setIsAddNewFoodFormOpen}} />
    </Grid>
  );
};
