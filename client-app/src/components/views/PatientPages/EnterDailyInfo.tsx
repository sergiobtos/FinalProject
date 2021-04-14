import React, {useState, useContext}  from "react";
import { requestPost} from "../../../utils/request";
import {
  Paper,
  Container,
  CssBaseline,
  Button,
  TextField,
  Grid,
  Typography,
  makeStyles
} from "@material-ui/core";
import AppContext from "../../../context/AppContext";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(0),
  },
  form: {
    width: "100%", 
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
  const appContext: any = useContext(AppContext);

  const [result, setResult] = useState({
    msg : ""
  });

  const [vitalSigns, setVitalSigns] = React.useState({
    userId: appContext.getUserData._id,
    userName: appContext.getUserData.userName,
    bodyTemperature: "",
    heartRate: "",
    bloodPressure: "",
    respiratoryRate: ""
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await requestPost("http://localhost:5000/createVitalSigns", vitalSigns);
    const jsonResult = await res.json();
        setResult({msg: jsonResult.msg });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}  elevation={3} >
      <CssBaseline />
      {result.msg && (<div className="alert alert-success" role="alert">{result.msg}</div>)}
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.typography} style={{ fontFamily: "georgia", fontWeight: "bold", color: 'black' }}>
          Enter Daily Info
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off" noValidate>
          <Grid container spacing={1}>
          <Grid item xs={12}>
          <br></br>
              <TextField
               autoComplete="off"
               label="Blood Temperature"
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
              <br>

              </br>
              <TextField
                autoComplete="off"
                label="Heart Rate"
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
              <br>

              </br>
              <TextField
                autoComplete="off"
                label="Blood Pressure"
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
              <br>

              </br>
              <TextField
               autoComplete="off"
               label="Respiratory Rate"
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
            style={{ color: "black", fontFamily: "georgia", backgroundColor: "green", fontWeight: "bold" }}
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
      </Paper>
    </Container>
  );
}
