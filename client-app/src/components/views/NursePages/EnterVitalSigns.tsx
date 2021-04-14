import React, { useEffect, useState } from "react";
import { Button, Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppContext from "../../../context/AppContext";
import { requestPost } from '../../../utils/request';

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),

  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
}));

export default function EnterVitalSigns() {
  const classes = useStyles();
  // need to use the global value
  const appContext: any = React.useContext(AppContext);
  const [result, setResult] = useState({
    msg : ""
  });
  const [vitalSigns, setVitalSigns] = useState({
    userId: appContext.getUserData._id,
    userName: "",
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
        <Typography style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} component="h1" variant="h5" >
          Enter Vital Signs
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} autoComplete="off" noValidate>
          <Grid container spacing={1}>
            <Grid item xs={12}>
            <br></br>
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
              <br></br>
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
              <br></br>
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
            <br></br>
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
          <Button style={{ color: 'black', fontFamily: 'georgia', backgroundColor: 'green', fontWeight: 'bold' }}
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