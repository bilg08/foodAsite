const drawerWidth = 240;

export const styles = {
  FoodsContainer: (theme) => ({
    width: `calc(100% - ${drawerWidth}px)`,
    height: `auto`,
    p: 10,
    display: "flex",
    background: "#F5F5F7",
    flexWrap: "wrap",
    gap: `10px`,
    [theme.breakpoints.down("sm")]: {
      width: `auto`,
      margin:'auto'
    },
  }),
  food: (theme) => ({
    color: "black",
    width: `250px`,
    minWidth: `250px`,
    height: `370px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    background: "transparent",
  }),
  addFoodBtn: (theme) => ({
    color: "white",
    background: theme.palette.green,
  }),
  addFoodLogo: (theme) => ({
    color: "#66B60F",
    width: `130px`,
    height: `130px`,
    borderRadius: `100%`,
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: `30`,
    background: `#F0F8E7`,
    border: `4px solid #66B60F`,
  }),
  foodImg: (theme) => ({
    color: "white",
    width: `130px`,
    height: `130px`,
    borderRadius: `100%`,
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: `30`,
  }),
  foodAboutContainer: (theme) => ({
    boxSizing: `borderBox`,
    position: `absolute`,
    width: `192px`,
    height: "260px",
    bottom: "0",
    borderRadius: `10px`,
    background: "white",
  }),
  FoodDetailsContainer: (theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: `0%`,
    fontSize: `18px`,
  }),
  AddNewFoodContainer: (theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    height: "80%",
    bottom: 0,
    left: `0%`,
  }),
  addNewFoodMain: (theme) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `100%`,
    position: "relative",
    flexDirection: "column",
  }),
};
