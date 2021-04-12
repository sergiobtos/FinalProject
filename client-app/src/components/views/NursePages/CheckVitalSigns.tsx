import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppContext from "../../../context/AppContext";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
}));

export default function CheckVitalSigns() {
  const classes = useStyles();
  const [vitalSigns, setVitalSigns] = React.useState({
    vitalSignsarray: [],
  });

  useEffect(() => {
    retrieveVitalSigns();
  }, []);

  const retrieveVitalSigns = () => {
    const res = fetch("http://localhost:5000/getVitalSigns")
      .then((data) => data.json())
      .then((data: any) => {
        console.log(data);
        if (data.msg == 1) {
          setVitalSigns({
            ...vitalSigns,
            vitalSignsarray: data.dataArr,
          });
        } else {
          alert(data.msg);
        }
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }}>Index</TableCell>
            <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">User Name</TableCell>
            <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">Body Temperature</TableCell>
            <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">Heart Rate</TableCell>
            <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">Blood Pressure</TableCell>
            <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">Respiratory Rate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vitalSigns.vitalSignsarray.map((item: any, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">{item.userName}</TableCell>
              <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">{item.bodyTemperature}</TableCell>
              <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">{item.heartRate}</TableCell>
              <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">{item.bloodPressure}</TableCell>
              <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align="right">{item.respiratoryRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
