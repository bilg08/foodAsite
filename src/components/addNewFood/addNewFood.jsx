import { Backdrop, Box, Button, Grid, Input } from "@mui/material";
import { useFoodsDatasContext } from "../../context/foodsContext";
import { useState } from "react";
import { setDocToFirebase } from "../../firebaseForThisProject/setDoc";
import CloseIcon from '@mui/icons-material/Close';
import {uploadImageToFirebase} from '../../firebaseForThisProject/storage'
export const AddNewFood = (props) => {
  const { isAddNewFoodFormOpen, setIsAddNewFoodFormOpen } = props.value;
  const [foodImg,setFoodImg]=useState('')
  const [addedFoods, setAddedFoods] = useState({
    name: "",
    detail: "",
    price: "",
  });
  const takeUserInput = (e) => {
    setAddedFoods({ ...addedFoods, [e.target.name]: e.target.value });
  };
  const takeUserOrder = async () => {
    console.log(addedFoods, `foods/${addedFoods.name}`);
    await setDocToFirebase(`foods/${addedFoods.name}`, addedFoods);
  };

  const styles = {
    addNewFoodContainer: (theme) => ({
      width: `40%`,
      height: `80%`,
      background: "green",
      display: "flex",
    }),
    AddNewFoodHeader: (theme) => ({
      width: `100%`,
      height: `8%`,
      background: "red",
    }),
    FoodFormContainer: (theme) => ({
      width: `100%`,
      height: `40%`,
      background: "yellow",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    }),
    FoodFormImageContainer: (theme) => ({
      width: `40%`,
      height: `80%`,
      background: "black",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      // borderRadius: `50%`,
      color:'white'
    }),
    FoodFormImage: (theme) => ({
      width: `40%`,
      height: `50%`,
      background: 'green',
      
      
    }),
    FoodForm: (theme) => ({
      width: `50%`,
      height: `90%`,
      background: "green",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }),
    FoodIngredients: (theme) => ({
      width: `100%`,
      height: `40%`,
      background: "red",
    }),
  };
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: isAddNewFoodFormOpen === true ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={true}
    >
      <Grid container sx={styles.addNewFoodContainer}>
        <Grid item sx={styles.AddNewFoodHeader}>
          <Button onClick={() => setIsAddNewFoodFormOpen(false)}>
            <CloseIcon />
          </Button>
        </Grid>
        <Grid item sx={styles.FoodFormContainer}>
          <Grid item sx={styles.FoodFormImageContainer}>
            <Box sx={styles.FoodFormImage}>
              <img src={foodImg.name}/>
            </Box>
            <Input onChange={(e) => {
              console.log(e.target.files[0]);
              setFoodImg((prevVal) => {
                let prevValACopy = prevVal;
                prevValACopy = e.target.files[0];
                return (prevVal = prevValACopy);
              });
              
              
            }} type="file" />
          </Grid>
          <Grid item sx={styles.FoodForm}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Хоолны нэр</label>
              <input onChange={(e) => takeUserInput(e)} name="name" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Дэлгэрэнгүй</label>
              <input onChange={(e) => takeUserInput(e)} name="detail" />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label>Хоолны үнэ</label>
              <input onChange={(e) => takeUserInput(e)} name="price" />
            </Box>
          </Grid>
        </Grid>
        <Grid item sx={styles.FoodIngredients}></Grid>
        <Button
          onClick={async () => {
            console.log(addedFoods)
            if(addedFoods.name!=""&&addedFoods.price!=""&&addedFoods.img!="")
              await takeUserOrder();
              await uploadImageToFirebase(foodImg, addedFoods.name);
         }}
          variant="outlined"
          color="secondary"
        >
          Нэмэх
        </Button>
      </Grid>
    </Backdrop>
  );
};
