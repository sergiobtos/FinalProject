import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import AppContext from "./context/AppContext";
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

export default function ButtonAppBar() {
  const classes = useStyles();
  const appContext: any = React.useContext(AppContext);
  return (
    <div className={classes.root}>
      <AppBar position="sticky" style={{ backgroundColor: "Green" }}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} style={{ color: "black", fontFamily: "georgia", fontWeight: "bold" }}>
            Comp 308 Final Project
          </Typography>
          {appContext.isSignedin ? (
            <Button
              style={{ color: "black", fontFamily: "georgia", fontWeight: "bold" }}
              color="inherit"
              onClick={appContext.handleLogoutToLoginPage}
            >
              Logout
            </Button>
          ) : (
              <></>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}