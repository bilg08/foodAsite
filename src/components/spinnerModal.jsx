import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useSpinnerDatasContext } from "../context/spinnerContext";

export default function Spinner() {
    const {isSpinning}=useSpinnerDatasContext()
  
  return (
    // <div>
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isSpinning}>
      <CircularProgress color="inherit" />
    </Backdrop>
    // </div>
  );
}
