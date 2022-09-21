import * as React from "react";

import {
  AppBar,
  Toolbar,
  styled,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Avatar,
  Menu,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetDocsFromFireBase } from "../../customHook/getDocsCustomHook";
import { useAgainGetDocs } from "../../context/getDataAgainContext";
import { useNavigate } from "react-router-dom";
import { useIsAdminLoggedContext } from "../../context/isAdminLoggedContext";
const drawerWidth = 240;
export const NavBar = (props) => {
  const settings = ["Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { signOutFromWebSite } = useIsAdminLoggedContext();
  const { handleDrawerToggle, whatPage } = props.value;
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
    NavbarContainer: (theme) => ({
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      [theme.breakpoints.down('sm')]: {
        width:`100%`
      }
    }),
  };
  return (
    <AppBar position="fixed" sx={styles.NavbarContainer}>
      <StyledHeader>
        <IconButton
          onClick={() => handleDrawerToggle()}
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={styles.menuButton}>
          <MenuIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: `50px`,
          }}>
          <h2>{whatPage}</h2>
        </Box>
        <HeaderSectionWithAvatarAndSearchNotification>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Button
                    onClick={async () => {
                      await signOutFromWebSite();
                      navigate("/");
                    }}
                    textAlign="center">
                    {setting}
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </HeaderSectionWithAvatarAndSearchNotification>
      </StyledHeader>
    </AppBar>
  );
};
