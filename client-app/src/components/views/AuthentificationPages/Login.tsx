import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppContext from "../../../context/AppContext";
import { InputLabel, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const classes = useStyles();
  // need to use the global value
  const appContext: any = React.useContext(AppContext);
  const [loginData, setLoginData] = React.useState({
    userName: "",
    password: ""
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const res = fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });
    res
      .then(data => data.json())
      .then((data: any) => {
        if (data.msg === 1) {
          appContext.handleGetUserData(data);
          appContext.handleSignedIn();
        } else {
          alert(data.msg);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{ fontWeight: "bold", fontFamily: "georgia" }}>
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Username:</InputLabel>
              <br>

              </br>
              <TextField
                style={{ fontWeight: "bold", fontFamily: "georgia" }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                name="userName"
                value={loginData.userName}
                onChange={(event: any) => {
                  setLoginData({
                    ...loginData,
                    userName: event.target.value
                  });
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Password:</InputLabel>
              <br>

              </br>
              <TextField
                style={{ fontWeight: "bold", fontFamily: "georgia" }}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                value={loginData.password}
                onChange={(event: any) => {
                  setLoginData({
                    ...loginData,
                    password: event.target.value
                  });
                }}
              />
            </Grid>
          </Grid>
          <Button
            style={{ color: "black", fontFamily: "georgia", backgroundColor: "Green", fontWeight: "bold" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                style={{ color: "black", fontWeight: "bold", fontFamily: "georgia" }}
                href="#"
                variant="body2"
                onClick={appContext.handleGoToRegisterPage}
              >
                {"New User? Register Here."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}