import { makeStyles } from "@mui/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";
import { handleSetAuthedUser } from "../../state/action-creator/authedUser";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    geetings: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    avatar: {
      marginLeft: theme.spacing(2),
    },
  };
});

const Layout = ({ children }) => {
  const { users, authedUser } = useSelector((state) => state);
  const userName = users[authedUser]?.name;
  const userAvatar = users[authedUser]?.avatarURL;

  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(handleSetAuthedUser(null));
    navigate("/login");
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classes.appBar}
          elevation={0}
          sx={{ background: "#f4f4f4", color: "#000000" }}
        >
          <Toolbar>
            <Typography className={classes.geetings}>Welcome!</Typography>
            {authedUser ? (
              <>
                <Typography>{userName}</Typography>
                <Avatar className={classes.avatar} src={userAvatar} />
                <Button onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button component={Link} to={`/login`}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
        >
          <div>
            <Typography variant="h5" className={classes.title}>
              Would you rather..?
            </Typography>
          </div>

          <List>
            {authedUser && (
              <>
                <ListItem
                  button
                  onClick={() => navigate("/")}
                  className={location.pathname === "/" ? classes.active : null}
                >
                  <ListItemIcon>
                    <HomeIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>

                <ListItem
                  button
                  onClick={() => navigate("/new")}
                  className={
                    location.pathname === "/new" ? classes.active : null
                  }
                >
                  <ListItemIcon>
                    <AddBoxIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="New Question" />
                </ListItem>
              </>
            )}

            <ListItem
              button
              onClick={() => navigate("/leader-board")}
              className={
                location.pathname === "/leader-board" ? classes.active : null
              }
            >
              <ListItemIcon>
                <SportsScoreIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Leader Board" />
            </ListItem>
          </List>
        </Drawer>

        <div className={classes.page}>
          <div className={classes.toolbar}></div>
          {children}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default Layout;
