import { AppBar, Toolbar, Typography,styled, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;
export const NavBar = (props) => {
  const StyledHeader = styled(Toolbar)(({ theme }) => ({
    background: "#FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    color: "black",
  }));
  const HeaderSectionWithAvatarAndSearchNotification = styled(Box)(({ theme }) => ({
    background: "red",
    width: `13%`,
    height: `64px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }));
  const HeaderSectionWithAvatar = styled(Box)(({ theme }) => ({
    border:'none',
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
      display:'none',
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    }),
  };
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
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
        <Box>
          <h2>{props.name}</h2>
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
