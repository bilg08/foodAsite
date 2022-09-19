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
  const d = {
    addNewFoodContainer: (theme) => ({
    width: `40%`,
    height: `95%`,
    background: "white",
      borderRadius: "10px",
      background:'white',
    // display: "flex",
    display:isAddingData===true?'none':'flex',
    color: "black",
    [theme.breakpoints.down("sm")]: {
      width: `400px`,
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: `550px`,
    },
    [theme.breakpoints.between("md", "lg")]: {
      width: `750px`,
    },
    [theme.breakpoints.up("lg")]: {
      width: `850px`,
    },
  }),
  }
  const [addedFoods, setAddedFoods] = useState({
    name: "",
    detail: "",
    price: "",
    portion: "",
  });
  const [ImageUrl, setImageUrl] = useState();
  const takeUserInput = (e) => {
    setAddedFoods({ ...addedFoods, [e.target.name]: e.target.value });
  };
  const takeUserOrder = async () => {
    await setDocToFirebase(`foods/${addedFoods.name}`, addedFoods).then(async() => {
      await setIsSpinning(false)
      setAddedFoods({
        name: "",
        detail: "",
        price: "",
        img: "",
        portion: "",
      });
      // await setImageUrl("");
    });
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
      open={true}>
      <Grid
        container
        sx={styles.addNewFoodContainer}>
        <Grid item sx={styles.AddNewFoodHeader}>
          <Button onClick={() => setIsAddNewFoodFormOpen(false)}>
            <CloseIcon />
          </Button>
          <Typography variant="h6">Хоол нэмэх</Typography>
          <Button
            onClick={async () => {
              setIsAddNewFoodFormOpen(false);
              setIsSpinning(true)
              await uploadImageToFirebase(foodImg, addedFoods.name);
              await takeUserOrder();
            }}
            variant="outlined"
            color="secondary">
            Хадгалах
          </Button>
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: `16px`, lineHeight: "24px" }}>
                Хоолны нэр
              </label>
              <StyledInput
                value={addedFoods.name}
                placeholder="Энд бичнэ үү"
                onChange={(e) => takeUserInput(e)}
                name="name"
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: `16px`, lineHeight: "24px" }}>
                Дэлгэрэнгүй
              </label>
              <StyledInput
                value={addedFoods.detail}
                sx={{ height: `70px` }}
                placeholder="Энд бичнэ үү"
                onChange={(e) => takeUserInput(e)}
                name="detail"
              />
            </Box>
            <Box sx={styles.styleForFormBottom}>
              <Box>
                <label>Үнэ</label>
                <StyledInput
                  value={addedFoods.price}
                  onChange={(e) => takeUserInput(e)}
                  name="price"
                  placeholder="Энд бичнэ үү"
                />
              </Box>
              <Box>
                <label>Порц</label>
                <StyledInput
                  value={addedFoods.portion}
                  onChange={(e) => takeUserInput(e)}
                  name="portion"
                  placeholder="Энд бичнэ үү"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item sx={styles.FoodIngredients}></Grid>
      </Grid>
    </Backdrop>
  );
};
