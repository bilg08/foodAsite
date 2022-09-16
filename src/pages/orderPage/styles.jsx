const drawerWidth = 240;

export const styles = {
  AllOrdersContainer: (theme) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    height: `auto`,
    p: 10,
    display: "flex",
    background: "#F5F5F7",
    flexWrap: "wrap",
    position: "relative",
    gap: `10px`,
    [theme.breakpoints.down("sm")]: {
      width: `auto`,
      margin: "auto",
    },
  }),
  newOrdersContainer: (theme) => ({
    width: `100%`,
    background: "red",
  }),
  shippedOrdersContainer: (theme) => ({
    width: `100%`,
    background: "red",
  }),
};
