import React from "react";
import {
  Button,
  makeStyles,
} from "@material-ui/core";
import AppContext from "../../../context/AppContext";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(4),
  },
}));


export default function SendEmergencyAlert() {
  const stypeClass = useStyles();
  const appContext: any = React.useContext(AppContext);
  console.log(appContext.getUserData);
  const requestData = { patientId: appContext.getUserData._id, patientUserName: appContext.getUserData.userName, time: Date.now(), status: true, responderId: null };
  const handleAlert = (e: any) => {
    e.preventDefault();
    const res = fetch("http://localhost:5000/sendEmergencyAlert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });
    res
      .then(data => data.json())
      .then((data: any) => {
        if (data.msg === 1) {
          alert("Alert sent! Nurse is on the way!");
        } else {
          alert(data.msg);
        }
      });
  };

  return (
    <Button className={stypeClass.button} variant="contained" color="secondary" onClick={handleAlert}
      style={{ color: "black", fontFamily: "georgia", backgroundColor: "green", fontWeight: "bold", marginLeft: "650px" }} >
        Send Emergency Alert
    </Button>
  );
}
