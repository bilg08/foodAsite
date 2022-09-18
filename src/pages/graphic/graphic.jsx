import * as React from "react";
import { Card,Grid } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { SideBar } from "../../components/sideBar/sideBar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { styles } from "./styles";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const Graphic = () => {


  return (
    <Grid container>
      <SideBar />
      <Grid item sx={styles.GraphicComponentContainer}>
        <Grid sx={styles.GraphicHeader}>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Нийт орлого</h2>
              <h3>100000₮</h3>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Захиалга</h2>
              <h3>4</h3>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Хүргэсэн</h2>
              <h3>4</h3>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Буцаагдсан</h2>
              <h3>0</h3>
            </Card>
          </Grid>
        </Grid>
        <Grid item>
          <Pie data={ data} />
        </Grid>
      </Grid>
    </Grid>
  );
};
