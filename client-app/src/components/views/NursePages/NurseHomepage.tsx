import React, { useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Typography, Box, Button } from "@material-ui/core";
import { AlertTitle, Alert } from "@material-ui/lab";
import EnterVitalSigns from "./EnterVitalSigns";
import CheckVitalSigns from "./CheckVitalSigns";
import EnterMotiTips from "./EnterMotiTips";
import AppContext from "../../../context/AppContext";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

export default function NurseHomepage() {
  const [value, setValue] = React.useState(0);
  const appContext: any = React.useContext(AppContext);
  const [alerts, setAlerts] = React.useState(
    [{ _id: "", patientId: "", patientUserName: "", status: true, time: Date.now() }]
  );
  useEffect(() => {
    retrieveAlerts();
  }, []);

  //retrive alert 
  const retrieveAlerts = () => {
    const res = fetch("http://localhost:5000/getAllActiveEAlert", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res
      .then((data) => data.json())
      .then((data: any) => {
        console.log(data);
        if (data.msg === 1) {
          // console.log(data.dataArr[0]);
          setAlerts(data.dataArr);
        } else {
          alert(data.msg);
        }
      });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };


  var handleAlert = (alertId: string) => {
    const res = fetch("http://localhost:5000/answerAlert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: alertId, nurseId: appContext.getUserData._id })
    });
    res
      .then(data => data.json())
      .then((data: any) => {
        if (data.msg === 1) {
          alert("Check the patient Now !");
          retrieveAlerts();
        } else {
          alert(data.msg);
        }
      });
  };



  return (

    <div>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} label="Enter Vital Signs" />
        <Tab style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} label="Check Vital Signs" />
        <Tab style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} label="Daily Motivational Tips" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div>
          {
            alerts.map(
              (alert) => (
                <Alert key={alert._id} severity="error">
                  <AlertTitle>Emergency Alert</AlertTitle>
              This Emergency alert from {alert.patientUserName} — check it out!
              <Button variant="contained" color="secondary" onClick={() => handleAlert(alert._id)} 
                    style={{ fontFamily: "georgia", backgroundColor: "green", fontWeight: "bold" }}> 
                  Answer Alert</Button>
                </Alert>
              ))
          }
        </div>
        <EnterVitalSigns />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          {
            alerts.map(
              (alert) => (
                <Alert key={alert._id} severity="error">
                  <AlertTitle>Emergency Alert</AlertTitle>
              This Emergency alert from {alert.patientUserName} — check it out!
                  <Button variant="contained" color="secondary" onClick={() => handleAlert(alert._id)} 
                    style={{ fontFamily: "georgia", backgroundColor: "green", fontWeight: "bold" }}> 
                  Answer Alert</Button>
                </Alert>
              ))
          }
        </div>
        <CheckVitalSigns />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          {
            alerts.map(
              (alert) => (
                <Alert key={alert._id} severity="error">
                  <AlertTitle>Emergency Alert</AlertTitle>
              This Emergency alert from {alert.patientUserName} — check it out!
              <Button variant="contained" color="secondary" onClick={() => handleAlert(alert._id)} 
                    style={{ fontFamily: "georgia", backgroundColor: "green", fontWeight: "bold" }}> 
                  Answer Alert</Button>
                </Alert>
              ))
          }
        </div>
        <EnterMotiTips />
      </TabPanel>

    </div>
  );
}