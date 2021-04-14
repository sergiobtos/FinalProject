import React, { useEffect } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Typography, Box, Button } from "@material-ui/core";
import EnterVitalSigns from "./EnterVitalSigns";
import CheckVitalSigns from "./CheckVitalSigns";
import EnterMotiTips from "./EnterMotiTips";
import AppContext from "../../../context/AppContext";
import AlertsPage from "../NursePages/Alerts";
import { requestGet} from "../../../utils/request";

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
  const retrieveAlerts = async () => {
    const res = await requestGet("http://localhost:5000/getAllActiveEmergencyAlert");
    const jsonResult = await res.json();
        if (jsonResult.msg === 1) {
          setAlerts(jsonResult.dataArr);
          appContext.handleAlerts(jsonResult.dataArr);
        } 
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
        <Tab style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} label="Check Alerts" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <EnterVitalSigns />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CheckVitalSigns />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EnterMotiTips />
      </TabPanel>
      <TabPanel value={value} index={3}>
          <AlertsPage />
      </TabPanel>
    </div>
  );
}