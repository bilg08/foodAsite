import {OrderPage} from "./pages/OrderPage/OrderPage";
import { ThemeProviderStyles } from "../src/themeProvider/theme";
import { Menu } from "./pages/Menu/Menu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const App = () => {
  // const styles = {
  //   container: (theme) => ({
  //     width: `100vw`,
  //     height: `100vh`,
  //     background: "#F5F5F7",
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     color: "black",
  //   }),
  //   food: (theme) => ({
  //     color: "black",
  //     width: `220px`,
  //     height: `320px`,
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     flexDirection: "column",
  //     position: "relative",
  //   }),
  //   foodImg: (theme) => ({
  //     background: "red",
  //     color: "white",
  //     width: `130px`,
  //     height: `138px`,
  //     borderRadius: `100%`,
  //     position: "absolute",
  //     zIndex: 1,
  //     top: 0,
  //     left: 50,
  //   }),
  //   foodAboutContainer: (theme) => ({
  //     color: "white",
  //     width: `80%`,
  //     height: `70%`,
  //     position: "absolute",
  //     border: `1px solid rgba(0, 7, 35, 0.08)`,
  //     borderRadius: `10px`,
  //     bottom: 0,
  //     display: "flex",
  //     justifyContent: "end",
  //     alignItems: "center",
  //     color:'black',
  //     flexDirection: "column",
  //   }),
  // };
  return (
    // <Grid container sx={styles.container}>
    //   <Grid item sx={styles.food}>
    //     <Card sx={styles.food}>
    //       <CardMedia
    //         src="https://freedesignfile.com/upload/2016/11/Delicious-five-split-beef-steak-HD-picture.jpg"
    //         sx={styles.foodImg}
    //         component="img"
    //       />
    //       <CardContent sx={styles.foodAboutContainer}>
    //         <Typography
    //           sx={{
    //             display: "flex",
    //             justifyContent: "center",
    //             alignItems: "center",
    //             flexDirection: "column",
    //           }}
    //           component="div">
    //           <h4>Цуйван</h4>
    //           <p style={{color:'silver'}}>Порц 1</p>
    //           <Box style={{ display: "flex", justifyContent: "space-between" }}>
    //             <p>11700Төг</p>
    //             <Button>+</Button>
    //           </Box>
    //         </Typography>
    //       </CardContent>
    //     </Card>
    //   </Grid>
    // </Grid>
    <ThemeProviderStyles>
      <div className="App">
          <Routes>
            <Route path="/Menu" element={<Menu/> } />
            <Route path="/" element={<OrderPage />} />
          </Routes>
      </div>
    </ThemeProviderStyles>
  );
};
