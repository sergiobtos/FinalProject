import React from "react";
import { Button, Paper, CssBaseline, TextField, Link }  from "@material-ui/core/";
import { Grid, Typography, Container, FormControl, Select  } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../../context/AppContext";
import { InputLabel, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
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
    const res = fetch("http://localhost:5000/signup", {
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
      <Paper className={classes.paper}  elevation={3}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.typography} style={{ fontWeight: "bold", fontFamily: "georgia" }}>
          Register Here
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <br></br>
              <TextField
                autoComplete="off"
                label="First Name"
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
              <br></br>
              <TextField
                autoComplete="off"
                label="Last Name"
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
              <br></br>
              <TextField
                autoComplete="off"
                label="Username"
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
              <br></br>
              <TextField
                autoComplete="off"
                label="Password"
                style={{ fontWeight: "bold", fontFamily: "georgia" }}
                variant="outlined"
                required
                fullWidth
                name="password"
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
            style={{ color: "black", fontFamily: "georgia", backgroundColor: "green", fontWeight: "bold" }}
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
      </Paper>
    </Container>
  );
}
