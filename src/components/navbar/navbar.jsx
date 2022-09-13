import { AppBar, Toolbar, Typography,styled } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
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
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <StyledHeader>
        <Box>
          <h2>{props.name}</h2>
        </Box>
        <HeaderSectionWithAvatarAndSearchNotification>
          <HeaderSectionWithAvatar>
            <SearchIcon />
            <NotificationsNoneIcon/>
          </HeaderSectionWithAvatar>
        </HeaderSectionWithAvatarAndSearchNotification>
      </StyledHeader>
    </AppBar>
  );
};
