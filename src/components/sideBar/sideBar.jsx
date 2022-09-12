import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { CardMedia } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SettingsIcon from "@mui/icons-material/Settings";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {Link} from 'react-router-dom'
import logo from "../../asset/Logo.png";
const drawerWidth = 240;
const styles = {
    DrawerTop: (theme) => ({
        width: `80%`,
        height: `auto`,
        border: `1px solid silver`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        marginTop: "25%",
    }),
    button: (theme) => ({
        color: "white",
        "&:active": {
            background: "linear-gradient(#5aff15,#00b712)",
            transition: "0.3s",
        },
    }),
}
export const SideBar = () => {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#000723",
            display: "flex",
            alignItems: "center",
          },
        }}
        variant="permanent"
        anchor="left">
        <Box sx={styles.DrawerTop}>
          <CardMedia sx={{ width: `120px` }} component="img" src={logo} />
          <List>
            {[
              {
                text: "Захиалга",
                pathName: "/",
                icon: <ListAltIcon />,
              },
              {
                text: "График",
                pathName: "/Graphic",
                icon: <SignalCellularAltIcon />,
              },
              {
                text: "Тохиргоо",
                pathName: "/Settings",
                icon: <SettingsIcon />,
              },
              {
                text: "Меню",
                pathName: "/Menu",
                icon: <RestaurantMenuIcon />,
              },
            ].map((item, index) => (
              <Link key={index} to={item.pathName}>
                <ListItem key={index} disablePadding>
                  <ListItemButton sx={styles.button}>
                    <ListItemIcon sx={{ color: "white" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    );
}