import React from "react";
import { Button, Paper} from "@material-ui/core/";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppContext from "../../../context/AppContext";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  body: {
    position: "fixed",
    width: "100%",
    height: "100%",
    backgroundImage: 'linear-gradient(#2a3342, #3e5c90)',
    padding: "80px",
    backgroundColor: "#038989",
    color: "white",
    textAlign: "center",
  }
}));



export default function SignIn() {
  const classes = useStyles();

  const appContext: any = React.useContext(AppContext);
  const [loginData, setLoginData] = React.useState({
    userName: "",
    password: "",
    error: false,
    errormsg: ""
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
        if (!data.error) {
          localStorage.setItem("token", data.token);
          appContext.handleGetUserData(data);
          appContext.handleSignedIn();
        } else {
          localStorage.removeItem("token");
          setLoginData({
            ...loginData,
            error: true,
            errormsg: data.errormsg
          })
        }
      });
  };

  return (
    <Container component="main" >
      <Paper className={classes.paper}  elevation={3} >
      <CssBaseline />
      {loginData.error && (<div className="alert alert-danger" role="alert">{loginData.errormsg}</div>)}
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{ fontWeight: "bold", fontFamily: "georgia" }}>
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12}>
              <br/>
              <TextField
                autoComplete="off"
                label="Username"
                style={{ fontWeight: "bold", fontFamily: "georgia" }}
                variant="outlined"
                color="primary"
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
              <br/>
              <TextField
                autoComplete="off"
                label="Password"
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
      </Paper>
    </Container>
  );
}