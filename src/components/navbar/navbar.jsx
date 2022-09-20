import * as React from "react";

import {
  AppBar,
  Toolbar,
  styled,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetDocsFromFireBase } from "../../customHook/getDocsCustomHook";
import { useAgainGetDocs } from "../../context/getDataAgainContext";
const drawerWidth = 240;
export const NavBar = (props) => {
  
  const [age, setAge] = React.useState("");
  const [datas, setDatas] = useGetDocsFromFireBase("orders");
  const { pathsNavigate } = useAgainGetDocs();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const StyledHeader = styled(Toolbar)(({ theme }) => ({
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    color: "black",
  }));
  const HeaderSectionWithAvatarAndSearchNotification = styled(Box)(
    ({ theme }) => ({
      background: "red",
      width: `13%`,
      height: `64px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    })
  );
  const HeaderSectionWithAvatar = styled(Box)(({ theme }) => ({
    border: "none",
    borderRight: `1px solid #DFE0EB`,
    width: `40%`,
    height: `64px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "black",
  }));
  const styles = {
    menuButton: (theme) => ({
      color: "black",
      mr: 2,
      display: "none",
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    }),
  };
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <StyledHeader>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={styles.menuButton}
          // onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: `50px`,
          }}
        >
          <h2>{props.name}</h2>
          <Box>
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
          </Box>
        </Box>
        <HeaderSectionWithAvatarAndSearchNotification>
          <HeaderSectionWithAvatar>
            <SearchIcon />
            <NotificationsNoneIcon />
          </HeaderSectionWithAvatar>
        </HeaderSectionWithAvatarAndSearchNotification>
      </StyledHeader>
    </AppBar>
  );
};
