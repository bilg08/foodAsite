import * as React from "react";
import { Card,Grid } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { SideBar } from "../../components/sideBar/sideBar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { styles } from "./styles";
import { useGetDatasFromArrayofDoc } from "../../customHook/getDatasFromDocsArray";
import { useGetDocsFromFireBase } from "../../customHook/getDocsCustomHook";
import { useEffect } from "react";
import { useGetAllOrdersDetails } from "../../customHook/getAllOrdersDetails";

ChartJS.register(ArcElement, Tooltip, Legend);



export const Graphic = () => {
  const allOrdersDetails = useGetAllOrdersDetails();
  const [graphDatas, setGraphDatas] = React.useState([]);
  const data = {
    labels: allOrdersDetails.ordersDateArray,
    datasets: [
      {
        label: "# of Votes",
        data: allOrdersDetails.ordersDataArray,
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
  return (
    <Grid container>
      <SideBar />
      <Grid item sx={styles.GraphicComponentContainer}>
        <Grid sx={styles.GraphicHeader}>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Нийт орлого</h2>
              <h1>{allOrdersDetails.totalProfit}₮</h1>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Захиалга</h2>
              <h1>{allOrdersDetails.ordersLength}</h1>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Хүргэсэн</h2>
              <h1>{allOrdersDetails.shippedOrderslength }</h1>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={styles.card}>
              <h2>Буцаагдсан</h2>
              <h1>0</h1>
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
