import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";
import { setDocToFirebase } from "../../firebaseForThisProject/setDoc";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToFirebase } from "../../firebaseForThisProject/storage";
import { styles, StyledInput } from "./styles";
import { useSpinnerDatasContext } from "../../context/spinnerContext";
import { useAgainGetDocs } from "../../context/getDataAgainContext";
import { useRef } from "react";
import { useEffect } from "react";

export const AddNewFood = (props) => {
  const [foodImg, setFoodImg] = useState("");
  const { isSpinning, setIsSpinning } =
    useSpinnerDatasContext();
  const [isAddingData, setIsAddingData] = useState(false);
  const { setAgainGetDocs } = useAgainGetDocs();
  const { isAddNewFoodFormOpen, setIsAddNewFoodFormOpen } = props.value;
  const [foodform, setFoodform] = useState({
    foodName: "",
    foodDetail: "",
    foodPrice: "",
    foodPortion: "",
  });
  const [ImageUrl, setImageUrl] = useState();
  // const [FoodIngredients, setFoodIngredients] = useState([]);
  // const foodIngredient=useRef(null)
  const takeFoodDetail = (e) => {
    setFoodform({ ...foodform, [e.target.name]: e.target.value });
  };
  // const addFoodIngredient = () => {
  //   const ingredientsFromAdmin = foodIngredient.current.value;
  //   setFoodIngredients(prevVal => {
  //     let prevValAcopy = prevVal;
  //     const isExist = prevValAcopy.indexOf(ingredientsFromAdmin);
  //     if (ingredientsFromAdmin != "") {
  //         if (isExist === -1) {
  //           prevValAcopy = [...prevValAcopy, ingredientsFromAdmin];
  //         } else if (isExist != -1) {
  //           prevValAcopy.splice(isExist, 1);
  //         } 
  //     }
  //     return(prevValAcopy)
  //   })
  // }
  // const deleteIngredient = (ingredient) => {
  //   console.log(ingredient)
  //   setFoodIngredients((prevVal) => {
  //     let prevValAcopy = prevVal;
  //     const indexOfTheIngredient = prevValAcopy.indexOf(ingredient);
  //     console.log(FoodIngredients,'kk1')
  //     prevValAcopy.splice(indexOfTheIngredient, 1);
  //     return prevValAcopy;
  //   });
  // }
  const formDetailsItems = [
    { type: "Хоолны нэр", inputName: "foodName" },
    { type: "Дэлгэрэнгүй", inputName: "foodDetail" },
    { type: "Үнэ", inputName: "foodPrice" },
    { type: "Порц", inputName: "foodPortion" },
  ];

  const takeUserOrder = async () => {
    setIsSpinning(true);
    setIsAddNewFoodFormOpen(false);
    await setDocToFirebase(`foods/${foodform.foodName}`, foodform).then(
      async () => {
        await uploadImageToFirebase(foodImg, foodform.foodName);
        await setIsSpinning(false);
        await setFoodform({
          foodName: "",
          foodDetail: "",
          foodPrice: "",
          foodPortion: "",
        });
        await setImageUrl("");
        setAgainGetDocs((prevVal) => !prevVal);
      }
    );
  };

  function takeFoodImgUrlToShowImgInAddNewFoodImgSection(e) {
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
      open={true}>
      <Grid container sx={styles.addNewFoodContainer}>
        <Grid item sx={styles.AddNewFoodHeader}>
          <Button onClick={() => setIsAddNewFoodFormOpen(false)}>
            <CloseIcon />
          </Button>
          <Typography variant="h6">Хоол нэмэх</Typography>
          <Button onClick={takeUserOrder}>Хадгалах</Button>
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
                }}>
                <Input
                  sx={{ display: "none" }}
                  onChange={(e) =>
                    takeFoodImgUrlToShowImgInAddNewFoodImgSection(e)
                  }
                  type="file"
                />
                <CameraAltIcon sx={styles.CameraIcon} />
              </label>
            </Box>
          </Grid>
          <Grid item sx={styles.FoodForm}>
            {formDetailsItems.map((formDetailsItem, index) => {
              return (
                <Box
                  key={`${formDetailsItem.type}+${index}`}
                  sx={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: `16px`, lineHeight: "24px" }}>
                    {formDetailsItem.type}
                  </label>
                  <StyledInput
                    value={foodform[formDetailsItem.inputName]}
                    placeholder="Энд бичнэ үү"
                    onChange={(e) => takeFoodDetail(e)}
                    name={formDetailsItem.inputName}
                  />
                </Box>
              );
            })}
          </Grid>
        {/* </Grid> */}
          {/* 
         <h1>Хоолны орц</h1>
            <TextField
              inputRef={foodIngredient}
              placeholder="Та орцоо оруулна уу?"
            /><Grid item sx={styles.FoodIngredients}>
          <Grid item sx={styles.FoodIngredientsAddingSection}>
           
            <Button variant="contained" onClick={() => addFoodIngredient()}>
              Нэмэх
            </Button>
          </Grid>
          <Grid item sx={styles.showFoodIngredientsAdminAdded}> */}
              {/* {FoodIngredients.map((ingredient) => {
                return (
                  <>
                    <p>{ingredient}</p>
                    <Button
                      onClick={() => deleteIngredient(ingredient)}
                      variant="contained">
                      -
                    </Button>
                  </>
                );
              })}
          </Grid> */}
        </Grid>
      </Grid>
    </Backdrop>
  );
};
