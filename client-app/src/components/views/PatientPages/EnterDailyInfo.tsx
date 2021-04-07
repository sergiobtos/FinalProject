import React from "react";
import {
  Container,
  CssBaseline,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  makeStyles
} from "@material-ui/core";
import AppContext from "../../../context/AppContext";
import { InputLabel, MenuItem } from "@material-ui/core";

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

export default function EnterDailyInfo() {
  const classes = useStyles();
  const appContext: any = React.useContext(AppContext);
  const [vitalSigns, setVitalSigns] = React.useState({
    userId: appContext.getUserData._id,
    userName: appContext.getUserData.userName,
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
        <Typography component="h1" variant="h5" className={classes.typography} style={{ fontFamily: "georgia", fontWeight: "bold" }}>
          Enter Daily Info
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <InputLabel required style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Blood Temperature:</InputLabel>
              <br>

              </br>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="bodyTemperature"
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
          <Button
            style={{ color: "black", fontFamily: "georgia", backgroundColor: "darkOrange", fontWeight: "bold" }}
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
