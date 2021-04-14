import React from "react";
import {
  Button, Container, CssBaseline, Typography, Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import AppContext from "../../../context/AppContext";
import {requestPost} from "../../../utils/request";
//import classes from "*.module.css";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(4),
    color: 'black',
    fontFamily: 'georgia',
    fontWeight: 'bold'
  },
  successButton :{
    borderStyle: 'solid',
    borderColor: 'green',
    fontWeight: 'bold',
    fontFamily: 'georgia'
  },
  failButton :{
    borderStyle: 'solid',
    borderColor: 'red',
    fontWeight: 'bold',
    fontFamily: 'georgia'
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(1)
  },
  paper: {
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
}));



export default function SendEmergencyAlert() {
  const classes = useStyles();
  const appContext: any = React.useContext(AppContext);
  
  const [emergencyAlert, setEmergencyAlert] = React.useState({
    patientId : appContext.getUserData._id,
    patientUserName : appContext.getUserData.userName,
    time : Date.now(),
    status: true,
    responderId: null,
    message: "",
  });

  //inserted { 0 = inserted with success, 1 = error , 3 = button submit wasn't clicked yet}
  const [response, setResponse] = React.useState({
    inserted : 3,
    message : "",
    dataReceived : []
  })

  const handleAlert = async (e: any) =>{
    e.preventDefault();
    e.target.reset();
    const res = await requestPost("http://localhost:5000/sendEmergencyAlert",emergencyAlert);
    const jsonResult = await res.json();
    setTimeout(function(){
      setResponse({...response, inserted : 3});
      setEmergencyAlert({...emergencyAlert, message : ""});
    }, 1500);
    if(jsonResult.inserted === 0){
      //inserted { 0 = inserted with success, 1 = error , 3 = button submit wasn't clicked yet}
      setResponse({
        inserted : jsonResult.inserted,
        message: jsonResult.msg,
        dataReceived : jsonResult.emergencyAlert
      })
    }else{
      //inserted { 0 = inserted with success, 1 = error , 3 = button submit wasn't clicked yet}
      setResponse({
        ...response,
        inserted : jsonResult.inserted,
        message: jsonResult.msg
      })
    }
  }
  
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <p>{(() => {
          //inserted { 0 = inserted with success, 1 = error , 3 = button submit wasn't clicked yet}
          switch (response.inserted) {
            case 0:   return <div className={ classes.successButton} style={{backgroundColor:'white'}}>{response.message}</div>;
            case 1:   return <div className={classes.failButton} style={{backgroundColor:'white'}}>{response.message}</div>;
            default:  return null;
          }
          })()}
        </p>
        <Typography style={{ fontFamily: 'georgia', fontWeight:'bold', color:'black'}} component='h1'variant='h5'>
          Enter Mensagem Alert to send to the Nurse{response.message}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleAlert} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField variant="outlined" required fullWidth multiline rows="5" 
            color='primary' style={{backgroundColor: 'white'}} 
            id="emergencyAlert" label="Type here your Emergency Alert" name="emergencyAlert" 
            value={emergencyAlert.message} 
            onChange={(event: any) =>{
              setEmergencyAlert({
                ...emergencyAlert,
                message: event.target.value
              });
            }}/>
          </Grid>
        </Grid>
        <Button 
          className={classes.button} 
          variant='contained' 
          style={{backgroundColor:'green'}} 
          type="submit"
        >
          Submit
        </Button>
        </form>
      </div>
    </Container>
  );
}
