import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Grid,
  Input,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useState } from "react";
import { setDocToFirebase } from "../../firebaseForThisProject/setDoc";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToFirebase } from "../../firebaseForThisProject/storage";
export const AddNewFood = (props) => {
  const { isAddNewFoodFormOpen, setIsAddNewFoodFormOpen } = props.value;
  const [foodImg, setFoodImg] = useState("");
  const [addedFoods, setAddedFoods] = useState({
    name: "",
    detail: "",
    price: "",
    img: "",
    portion: "",
  });
  const [ImageUrl, setImageUrl] = useState();
  const takeUserInput = (e) => {
    setAddedFoods({ ...addedFoods, [e.target.name]: e.target.value });
  };
  const takeUserOrder = async () => {
    await setDocToFirebase(`foods/${addedFoods.name}`, addedFoods);
  };

  const StyledInput = styled(TextField)((theme) => ({
    background: `#FFFFFF`,
    borderRadius: `6px`,
    width: `100%`,
    outline: "none",
  }));

  const styles = {
    addNewFoodContainer: (theme) => ({
      width: `40%`,
      height: `95%`,
      background: "white",
      borderRadius: "10px",
      display: "flex",
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
    AddNewFoodHeader: (theme) => ({
      width: `100%`,
      height: `8%`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }),
    FoodFormContainer: (theme) => ({
      width: `100%`,
      height: `40%`,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    }),
    FoodFormImageContainer: (theme) => ({
      width: `40%`,
      height: `auto`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }),
    FoodFormImage: (theme) => ({
      width: `70%`,
      height: `70%`,
      borderRadius: `50%`,
      position: "relative",
      border: `1px solid #66B60F`,
    }),
    FoodForm: (theme) => ({
      width: `50%`,
      height: `auto`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    }),
    FoodIngredients: (theme) => ({
      width: `100%`,
      height: `40%`,
      background: "red",
    }),
    CameraIcon: (theme) => ({
      padding: `5px`,
      position: "absolute",
      bottom: 0,
      right: 0,
      background: theme.palette.silver,
      borderRadius: `100%`,
      boxShadow: "0 0 0 6px white",
    }),
    styleForFormBottom: (theme) => ({
      display: "flex",
      gap: `5%`,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
      },
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
          <Typography variant="h6">Хоол нэмэх</Typography>
          <Button
            onClick={async () => {
              // if (
              //   addedFoods.name != "" &&
              //   addedFoods.price != "" &&
              //   addedFoods.img != ""
              // ) {
              uploadImageToFirebase(foodImg, addedFoods.name);
              await takeUserOrder();
              // }
            }}
            variant="outlined"
            color="secondary"
          >
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
