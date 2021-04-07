import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppContext from "../../../context/AppContext";
import { InputLabel, MenuItem } from "@material-ui/core";
import { stringify } from "querystring";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  typography: {
    marginBottom: theme.spacing(2)
  }
}));

export default function EnterVitalSigns() {
  const classes = useStyles();
  // need to use the global value
  const appContext: any = React.useContext(AppContext);
  const [vitalSigns, setVitalSigns] = React.useState({
    userId: appContext.getUserData._id,
    userName: "",
    bodyTemperature: "",
    heartRate: "",
    bloodPressure: "",
    respiratoryRate: ""
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(vitalSigns)
    const res = fetch("http://localhost:8500/saveVitalSigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vitalSigns)
    });
    res
      .then(data => data.json())
      .then((data: any) => {
        alert(data.msg);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} component="h1" variant="h5" className={classes.typography}>
          Enter Vital Signs
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>

          <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>UserName of Patient:</InputLabel>
              <br>

              </br>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="UserName of Patient"
                name="userName"
                value={vitalSigns.userName}
                onChange={(event: any) => {
                  setVitalSigns({
                    ...vitalSigns,
                    userName: event.target.value
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Body Temperature:</InputLabel>
              <br>

              </br>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="bodyTemperature"
                label="Please enter Body Temperature"
                name="bodyTemperature"
                value={vitalSigns.bodyTemperature}
                onChange={(event: any) => {
                  setVitalSigns({
                    ...vitalSigns,
                    bodyTemperature: event.target.value
                  });
                }}
              />
            </Grid>

            
            <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Heart Rate:</InputLabel>
              <br>

              </br>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="heartRate"
                label="Please enter Heart Rate"
                name="heartRate"
                value={vitalSigns.heartRate}
                onChange={(event: any) => {
                  setVitalSigns({
                    ...vitalSigns,
                    heartRate: event.target.value
                  });
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Blood Pressure:</InputLabel>
              <br>

              </br>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="bloodPressure"
                label="Please enter Blood Pressure"
                name="bloodPressure"
                value={vitalSigns.bloodPressure}
                onChange={(event: any) => {
                  setVitalSigns({
                    ...vitalSigns,
                    bloodPressure: event.target.value
                  });
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Respiratory Rate:</InputLabel>
              <br>

              </br>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="respiratoryRate"
                label="Please enter Respiratory Rate"
                id="respiratoryRate"
                value={vitalSigns.respiratoryRate}
                onChange={(event: any) => {
                  setVitalSigns({
                    ...vitalSigns,
                    respiratoryRate: event.target.value
                  });
                }}
              />
            </Grid>
          </Grid>
          <Button style={{ color: 'black', fontFamily: 'georgia', backgroundColor: 'darkOrange', fontWeight: 'bold' }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      <Box mt={5}></Box>
    </Container>
  );
}