import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useFoodsDatasContext } from "../../context/foodsContext";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { deleteFileFromFirebaseStorage } from "../../firebaseForThisProject/deleteFileFromStorage";
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
import { deleteDocOfFirebase } from "../../firebaseForThisProject/deleteDoc";
import { styles } from "./styles";
import Spinner from "../../components/spinnerModal";
import { useSpinnerDatasContext } from "../../context/spinnerContext";
import { useAgainGetDocs } from "../../context/getDataAgainContext";
import { NavBar } from "../../components/navbar/navbar";

export const Menu = () => {
  const { foodsDatas } = useFoodsDatasContext(false);
  const {
    setIsSpinning,
  } = useSpinnerDatasContext();
  const {setAgainGetDocs}=useAgainGetDocs()
  const [isAddNewFoodFormOpen, setIsAddNewFoodFormOpen] = React.useState(false);
  
  const AddNewFoodBox = () => {
    return (
      <Grid item>
        <Card sx={styles.food}>
          <Fab sx={styles.addFoodLogo}>
            <RestaurantMenuIcon />
          </Fab>
          <CardContent sx={styles.foodAboutContainer}>
            <Typography sx={styles.AddNewFoodContainer} component="div">
              <Box sx={styles.addNewFoodMain}>
                <p style={{ fontSize: `18px` }}>Шинэ хоол нэмэх</p>
                <Fab
                  onClick={() => setIsAddNewFoodFormOpen(true)}
                  sx={styles.addFoodBtn}
                  size="medium">
                  <AddIcon />
                </Fab>
              </Box>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
  


const Food = (props) => {
  const food = props.value;
  if (food === undefined) {
    return null;
  } else {
    return (
      <Card sx={styles.food}>
        <CardMedia src={food.img} sx={styles.foodImg} component="img" />
        <CardContent sx={styles.foodAboutContainer}>
          <Typography sx={styles.FoodDetailsContainer} component="div">
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
              <h2>{food.foodName}</h2>
              <p>{`Порц${food.foodPortion}`}</p>
              <Box
                sx={{
                  width: `100%`,
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <h3>{food.foodPrice}₮</h3>
                <Fab
                  onClick={async () => {
                    setIsSpinning(true);
                    await deleteFileFromFirebaseStorage(
                      `foods/${food.foodName}`
                    );
                    deleteDocOfFirebase(`foods/${food.foodName}`).then(
                      async () => {
                        await setIsSpinning(false);
                        setAgainGetDocs(prevVal=>!prevVal)
                      }
                    );
                  }}
                  sx={styles.addFoodBtn}
                  size="medium"
                >
                  <RemoveIcon />
                </Fab>
              </Box>
            </Box>
          </Typography>
        </CardContent>
      </Card>
    );
  }
};


  return (
    <Grid container>
      <SideBar />
      <NavBar type="Цэс"/>
      <Grid item justifyContent="center" sx={styles.FoodsContainer}>
        <AddNewFoodBox />
        <Spinner/>
        {foodsDatas.map((food) => {
          return <Food key={food.foodName} value={food} />;
        })}
      </Grid>
      <AddNewFood value={{ isAddNewFoodFormOpen, setIsAddNewFoodFormOpen }} />
    </Grid>
  );
};

