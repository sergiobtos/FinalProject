import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from "@material-ui/core";
import { Container } from "@material-ui/core";
import AppContext from "../../../context/AppContext";
import { requestGet } from '../../../utils/request';
import { requestPost} from "../../../utils/request";

const userStyles = makeStyles ({
  table:{
    minWidth: 650,
  }
})

export default function Alerts() {
  const appContext: any = React.useContext(AppContext);

  const [result, setResult] = React.useState(false);
  const [alerts, setAlerts] = React.useState(
    [{ _id: "", patientId: "", patientUserName: "", status: true, time: Date.now() }]
  );

  useEffect(() => {
    retrieveAlerts();
  }, []);
 
  const classes = userStyles();
 
   
  const retrieveAlerts = async () => {
    const res = await requestGet("http://localhost:5000/getAllActiveEmergencyAlert");
    const jsonResult = await res.json();
    if (jsonResult.msg) {
        setAlerts(jsonResult.dataArr);
        setResult(true);
        appContext.handleAlerts(jsonResult.dataArr);
      }
  };

  var handleAlert = async (alertId: string) => {
    const res = await requestPost("http://localhost:5000/replyAlert", { id: alertId, nurseId: appContext.getUserData._id });
    const jsonResult = await res.json(); 
        if (jsonResult.msg === 1) {
          alert(`Check ${jsonResult.patientUsername[0].patientUserName.toUpperCase()} Now !`);
          retrieveAlerts();
        } else {
          alert(jsonResult.msg);
        }
  };

  return (
    <div>
    {result ?
    (<TableContainer component= {Paper}>
      <Table className={classes.table} aria-label="simpple table">
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Alert Message</TableCell>
            <TableCell>#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            alerts.map((alert)=> (
                <TableRow key={alert._id}>
                  <TableCell component="th" scope="row">{alert.patientUserName}</TableCell>
                  <TableCell > Test</TableCell>
                  <TableCell > <IconButton>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                    </IconButton>                  
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
    </TableContainer>) :
    <Container>
       <div className="alert alert-danger" role="alert">No Emergency Alerts for now! </div>
    </Container>  } 
    </div>  
  );
}