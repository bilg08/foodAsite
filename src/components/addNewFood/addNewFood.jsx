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
import { useState } from "react";
import { setDocToFirebase } from "../../firebaseForThisProject/setDoc";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToFirebase } from "../../firebaseForThisProject/storage";
import {styles,StyledInput} from "./styles"
import { useSpinnerDatasContext } from "../../context/spinnerContext";



export const AddNewFood = (props) => {
  const { isAddNewFoodFormOpen, setIsAddNewFoodFormOpen } = props.value;
  const [foodImg, setFoodImg] = useState("");
  const [isAddingData, setIsAddingData] = useState(false);
  const { isSpinning, setIsSpinning, setShouldHaveToReloadPage } =
  useSpinnerDatasContext();
 
  const [addedFoods, setAddedFoods] = useState({
    foodName: "",
    foodDetail: "",
    foodPrice: "",
    foodPortion: "",
  });
  const [ImageUrl, setImageUrl] = useState();
  const takeUserInput = (e) => {
    setAddedFoods({ ...addedFoods, [e.target.name]: e.target.value });
  };

  const formDetailsItems = [
    { type: "Хоолны нэр", inputName: "foodName" },
    { type: "Дэлгэрэнгүй", inputName: "foodDetail" },
    { type: "Үнэ", inputName: "foodPrice" },
    { type: "Порц", inputName: "foodPortion" },
  ];



  const takeUserOrder = async () => {
    setIsSpinning(true);
    setIsAddNewFoodFormOpen(false)
    await setDocToFirebase(`foods/${addedFoods.foodName}`, addedFoods).then(
      async () => {
        await uploadImageToFirebase(foodImg, addedFoods.foodName);
        await setIsSpinning(false);
        await setAddedFoods({
          name: "",
          detail: "",
          price: "",
          img: "",
          portion: "",
        });
        setShouldHaveToReloadPage(true);
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
      open={true}
    >
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
                  }}
                >
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
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <label style={{ fontSize: `16px`, lineHeight: "24px" }}>
                    {formDetailsItem.type}
                  </label>
                  <StyledInput
                    value={addedFoods[formDetailsItem.inputName]}
                    placeholder="Энд бичнэ үү"
                    onChange={(e) => takeUserInput(e)}
                    name={formDetailsItem.inputName}
                  />
                </Box>
              );
            })}
          </Grid>
        </Grid>
        <Grid item sx={styles.FoodIngredients}></Grid>
      </Grid>
    </Backdrop>
  );
};
