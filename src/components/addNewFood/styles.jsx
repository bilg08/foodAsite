import { Input, styled, TextField } from "@mui/material";

export const styles = {
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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  }),
  
};

export const StyledInput = styled(TextField)((theme) => ({
   background: `#FFFFFF`,
   borderRadius: `6px`,
   width: `100%`,
   outline: "none",
 }));