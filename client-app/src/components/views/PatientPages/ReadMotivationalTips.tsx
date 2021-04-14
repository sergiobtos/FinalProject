import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { requestGet} from "../../../utils/request";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275,
    marginTop: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  pos: {
    marginBottom: 12
  },
  table: {
    minWidth: 650,
  },
}));

export default function ReadMotivationalTips() {
  const classes = useStyles();
  
  const [result, setResult] = useState({
    msg : ""
  });

  const [motivationalTips, setMotivationalTips] = useState({
    tipsArray : [],
  });

  useEffect(() => {
    retrieveMotiTips();
  }, []);

  const retrieveMotiTips = async () => {
    const res = await requestGet("http://localhost:5000/getMotivationalTips");
    const arrayResult = await res.json();
        if (arrayResult.result == 0) {
          //no tip for today
          setResult({msg: arrayResult.msg});
        } else {
          //there are tips for today
          await setMotivationalTips({
            tipsArray : arrayResult.dataArray
          })
          setResult({msg: arrayResult.msg});
        }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h1" style={{fontFamily: "georgia", fontWeight: "bold" }}>
          {result.msg}
        </Typography>
        <div>
          <TableContainer component={Paper}>
              <Table className={classes.table} aria-lable="simple-table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{fontFamily:"georgia", fontWeight:'bold', color:'black'}}>Index</TableCell>
                    <TableCell style={{fontFamily:"georgia", fontWeight:'bold', color:'black'}}>Message</TableCell>
                    <TableCell style={{fontFamily:"georgia", fontWeight:'bold', color:'black'}}>Url</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {motivationalTips.tipsArray.map((item: any, index)=>(
                  <TableRow key={index}>
                    <TableCell component='th' scope='row'>#{index +1}</TableCell>
                    <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align='center' >{item.tips}</TableCell>
                    <TableCell style={{ fontFamily: "georgia", fontWeight: 'bold', color: 'black' }} align='center' >
                      <a href={item.url} target="_blank">Click here to watch motivational video</a>
                    </TableCell>
                  </TableRow>
                
                ))}
                </TableBody>
              </Table>
            </TableContainer>
         
        </div>
      </CardContent>
    </Card>
  );
}