import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Typography, Box } from "@material-ui/core";
import ReadMotivationalTips from "./ReadMotivationalTips";
import SendEmergencyAlert from "./SendEmergencyAlert";
import EnterDailyInfo from "./EnterDailyInfo";

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

export default function PatientHomepage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        style={{ color: "black", fontFamily: "georgia", fontWeight: "bold" }}
        value={value}
        indicatorColor="secondary"
        textColor="black"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} label="Daily Tips" />
        <Tab style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} label="Emergency Alert" />
        <Tab style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} label="Daily Infomation" />
        <Tab style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} label="Common Signs Checklist" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ReadMotivationalTips />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SendEmergencyAlert />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EnterDailyInfo />
      </TabPanel>
    </div>
  );
}
