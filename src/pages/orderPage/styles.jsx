import { Grid, styled } from "@mui/material";

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
    justifyContent: 'center',
    alignItems:'center',
    gap: `10px`,
    [theme.breakpoints.down("sm")]: {
      width: `100%`,
    },
  }),
  newOrdersContainer: (theme) => ({
    minWidth: `250px`,
    width: `auto`,
    overflow: "scroll",
    border: `1px solid #DFE0EB`,
  }),
  shippedOrdersContainer: (theme) => ({
    minWidth: `250px`,
    width: `auto`,
    overflow: "scroll",
    border: `1px solid #DFE0EB`,
  }),
};
export const AOrdersHeader = styled(Grid)(({ theme }) => ({
  width:`auto`,
  height: `auto`,
  background: `#F5F5F7`,
}));

export const OrdersContainer = styled(Grid)(({ theme }) => ({
  maxWidth: `100%`,
  height: `auto`,
  display:'flex',
}));
export const NewOrder = styled(Grid)(({ theme }) => ({
  minWidth: `250px`,
  height: `auto`,
}));
export const ShippedOrder = styled(Grid)(({ theme }) => ({
  minWidth: `250px`,
  height: `auto`,
}));
