import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { requestGet} from "../../../utils/request";

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
  }
}));

export default function ReadMotiTips() {
  const classes = useStyles();
  
  const [result, setResult] = useState({
    msg : ""
  });

  const [motivationalTips, setMotivationalTips] = useState({
    tips: ""
  });

  useEffect(() => {
    retrieveMotiTips();
  }, []);

  const retrieveMotiTips = async () => {
    const res = await requestGet("http://localhost:5000/getMotivationalTips");
    const jsonResult = await res.json();
        if (jsonResult.result == 0) {
          //no tip for today
          setResult({msg: jsonResult.msg});
        } else {
          //there are tips for today
          setMotivationalTips(jsonResult.data);
          setResult({msg: jsonResult.msg});
        }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h1" style={{fontFamily: "georgia", fontWeight: "bold" }}>
          {result.msg}
        </Typography>
        <Typography variant="body2" component="p">
          {motivationalTips.tips}
        </Typography>
      </CardContent>
    </Card>
  );
}