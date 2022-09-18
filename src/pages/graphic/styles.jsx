const drawerWidth=240
export const styles = {
  GraphicComponentContainer: (theme) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    height: `auto`,
    p: 10,
    display: "flex",
    background: "#F5F5F7",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: `10px`,
    [theme.breakpoints.down("sm")]: {
      width: `auto`,
      margin: "auto",
    },
  }),
  GraphicHeader: (theme) => ({
    width: `100%`,
    background: `#f7c`,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("md")]: {
      width: `auto`,
      margin: "auto",
      justifyContent: "center",
    },
  }),
    card: (theme) => ({
    width: `250px`,
    height:`135px`,
    background: `#FFFFFF`,
    border: `1px solid #DFE0EB`,
    borderRadius: `8px`,
  }),
};