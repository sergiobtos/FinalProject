import React, { useEffect , useState} from "react";
import { requestGet} from "../../../utils/request";
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
  const [vitalSigns, setVitalSigns] = useState({
    vitalSignsarray: [],
  });

  useEffect(() => {
    retrieveVitalSigns();
  }, []);

  const retrieveVitalSigns = async () => {
    const res = await requestGet("http://localhost:5000/getVitalSigns");
    const jsonResult = await res.json();
        if (jsonResult.msg == 1) {
          setVitalSigns({
            ...vitalSigns,
            vitalSignsarray: jsonResult.dataArr,
          });
        } else {
          alert(jsonResult.msg);
        }
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
