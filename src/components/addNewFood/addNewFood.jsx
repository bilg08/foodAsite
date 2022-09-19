import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useEffect, useState } from "react";
import { setDocToFirebase } from "../../firebaseForThisProject/setDoc";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToFirebase } from "../../firebaseForThisProject/storage";
import { styles, StyledInput } from "./styles";




export const AddNewFood = (props) => {
  const { isAddNewFoodFormOpen, setIsAddNewFoodFormOpen } = props.value;
  const [foodImg, setFoodImg] = useState("");
  const [ImageUrl, setImageUrl] = useState();
  
  

  const UserInputForFoodDetails = (props) => {
      const [addedFoods, setAddedFoods] = useState({
          foodName: "",
          detail: "",
          price: "",
          portion: "",
          FoodIngredients:[]
      });
      const { addedFoodsType, labelName } = props.value;
      const takeUserInput = (e) => {
        setAddedFoods({ ...addedFoods, [e.target.name]: e.target.value });
      };
      
      return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontSize: `16px`, lineHeight: "24px" }}>
            {labelName}
          </label>
          <StyledInput
            sx={styles.inputStyle}
            value={addedFoods[addedFoodsType]}
            placeholder="Энд бичнэ үү"
            onChange={(e) => takeUserInput(e)}
            name={addedFoodsType}
          />
        </Box>
      );
  }
  
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
          <Typography variant="h6">Хоол нэмэх</Typography>
          {/* <Button
            onClick={async () => {
              uploadImageToFirebase(foodImg, addedFoods.name);
              await takeUserOrder();
            }}
          >
            Хадгалах
          </Button> */}
        </Grid>
        <Grid item sx={styles.FoodFormContainer}>
          <Grid item sx={styles.FoodFormImageContainer}>
            <Box sx={styles.FoodFormImage}>
              <CardMedia
                sx={{ borderRadius: "100%" }}
                src={ImageUrl}
                component="img"
              />
              <label
                sx={{
                  border: `1px solid red`,
                  display: `inline-block`,
                  padding: `6px 12px`,
                  cursor: `pointer`,
                }}
              >
                <Input
                  sx={{ display: "none" }}
                  onChange={(e) => {
                    var file = e.target.files[0];
                    var reader = new FileReader();
                    reader.onload = function (event) {
                      setImageUrl(event.target.result);
                    };
                    reader.readAsDataURL(file);
                    setFoodImg((prevVal) => {
                      let prevValACopy = prevVal;
                      prevValACopy = e.target.files[0];
                      return (prevVal = prevValACopy);
                    });
                  }}
                  type="file"
                />
                <CameraAltIcon sx={styles.CameraIcon} />
              </label>
            </Box>
          </Grid>
          <Grid item sx={styles.FoodForm}>
            <UserInputForFoodDetails
              value={{ addedFoodsType: "foodName", labelName: "Хоолны нэр" }}
            />
            <UserInputForFoodDetails
              value={{ addedFoodsType: "detail", labelName: "Дэлгэрэнгүй" }}
            />
            <Box sx={styles.styleForFormBottom}>
              <UserInputForFoodDetails
                value={{ addedFoodsType: "price", labelName: "Үнэ" }}
              />
              <UserInputForFoodDetails
                value={{ addedFoodsType: "portion", labelName: "Хэмжээ" }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid item sx={styles.FoodIngredients}></Grid>
      </Grid>
    </Backdrop>
  );
};
