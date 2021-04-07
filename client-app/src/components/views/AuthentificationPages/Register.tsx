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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { InputLabel, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  typography: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Register() {
  const classes = useStyles();
  // need to use the global value
  const appContext: any = React.useContext(AppContext);
  const [userInfoData, setUserInfoData] = React.useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    accountType: "Nurse",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const res = fetch("http://localhost:8500/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfoData),
    });
    res
      .then((data) => data.json())
      .then((data: any) => {
        if (data.msg === 1) {
          appContext.handleGoToLoginPage();
        } else {
          alert(data.msg);
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.typography} style={{ fontWeight: "bold", fontFamily: "georgia" }}>
          Register Here
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>First Name:</InputLabel>
              <br>

              </br>
              <TextField
                style={{ fontWeight: "bold", fontFamily: "georgia" }}
                variant="outlined"
                required
                fullWidth
                id="firstName"
                name="firstName"
                value={userInfoData.firstName}
                onChange={(event: any) => {
                  setUserInfoData({
                    ...userInfoData,
                    firstName: event.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Last Name:</InputLabel>
              <br>

              </br>
              <TextField
                style={{ fontWeight: "bold", fontFamily: "georgia" }}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                name="lastName"
                value={userInfoData.lastName}
                onChange={(event: any) => {
                  setUserInfoData({
                    ...userInfoData,
                    lastName: event.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Username:</InputLabel>
              <br>

              </br>
              <TextField
                style={{ fontWeight: "bold", fontFamily: "georgia" }}
                variant="outlined"
                required
                fullWidth
                id="userName"
                name="userName"
                value={userInfoData.userName}
                onChange={(event: any) => {
                  setUserInfoData({
                    ...userInfoData,
                    userName: event.target.value,
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
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={userInfoData.password}
                onChange={(event: any) => {
                  setUserInfoData({
                    ...userInfoData,
                    password: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required className={classes.formControl}>
              <InputLabel required id="labelAccountType" style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>
                  Choose Account Type
                </InputLabel>
                <Select
                  required
                  labelId="labelAccountType"
                  id="accountType"
                  value={userInfoData.accountType}
                  onChange={(event: any) => {
                    setUserInfoData({
                      ...userInfoData,
                      accountType: event.target.value,
                    });
                  }}
                >
                  <MenuItem style={{ fontWeight: "bold", fontFamily: "georgia" }} value="Nurse">Nurse</MenuItem>
                  <MenuItem style={{ fontWeight: "bold", fontFamily: "georgia" }} value="Patient">Patient</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            style={{ color: "black", fontFamily: "georgia", backgroundColor: "darkOrange", fontWeight: "bold" }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link
                style={{ color: "black", fontWeight: "bold", fontFamily: "georgia" }}
                href="#"
                variant="body2"
                onClick={appContext.handleGoToLoginPage}
              >
                Already an user? Sign in here.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}
