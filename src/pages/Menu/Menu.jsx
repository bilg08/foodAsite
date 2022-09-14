import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFoodsDatasContext } from "../../context/foodsContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {deleteFileFromFirebaseStorage} from "../../firebaseForThisProject/deleteFileFromStorage"
import {
  Card,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  Toolbar,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { SideBar } from "../../components/sideBar/sideBar";
import { AddNewFood } from "../../components/addNewFood/addNewFood";
import { NavBar } from "../../components/navbar/navbar";
import { deleteDocOfFirebase } from "../../firebaseForThisProject/deleteDoc";

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

    container: (theme) => ({
      width: `calc(100% - ${drawerWidth}px)`,
      height: `auto`,
      background: "#F5F5F7",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      color: "black",
      marginTop: "auto",
      position: "absolute",
      top: `10%`,
      right: 0,
      gap: `10px`,
      textAlign: "center",
    }),

    food: (theme) => ({
      color: "black",
      width: `250px`,
      height: `350px`,
      display: "flex",
      background:'red',
      background: "transparent",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
    }),
    addFoodBtn: (theme) => ({
      color: "white",
      background: theme.palette.green,
    }),

    addFoodLogo: (theme) => ({
      color: "#66B60F",
      width: `130px`,
      height: `130px`,
      borderRadius: `100%`,
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: `30`,
      background: `#F0F8E7`,
      border: `4px solid #66B60F`,
    }),
    foodImg: (theme) => ({
      color: "white",
      width: `130px`,
      height: `130px`,
      borderRadius: `100%`,
      position: "absolute",
      zIndex: 1,
      top: 0,
      left: `30`,
    }),
    foodAboutContainer: (theme) => ({
      boxSizing: `borderBox`,
      position: `absolute`,
      width: `192px`,
      height: "250px",
      bottom: "0",
      borderRadius: `10px`,
      background:'white'
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
    <Grid sx={{ display: "flex", background: "red",}}>
      <NavBar name="Меню" />
      <SideBar />
      <Grid container sx={styles.container}>
        <Grid item >
          <Card sx={styles.food}>
            <Fab sx={styles.addFoodLogo}>
              <RestaurantMenuIcon />
            </Fab>
            <CardContent sx={styles.foodAboutContainer}>
              <Typography sx={styles.AddNewFoodContainer} component="div">
                <Box sx={styles.addNewFoodMain}>
                  <p style={{fontSize:`18px`}}>Шинэ хоол нэмэх</p>
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
            <Grid key={index} item >
              <Card  sx={styles.food}>
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
                        <Fab onClick={async () => {
                          await deleteFileFromFirebaseStorage(
                            `foods/${food.name}`
                          );
                          deleteDocOfFirebase(`foods/${food.name}`)
                        }} sx={styles.addFoodBtn} size="medium">
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
