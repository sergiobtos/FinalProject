import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
  const [motivationalTips, setMotivationalTips] = React.useState({
    tips: ""
  });

  useEffect(() => {
    retrieveMotiTips();
  }, []);

  const retrieveMotiTips = () => {
    const res = fetch("http://localhost:5000/retrieveMotiTips", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    res
      .then(data => data.json())
      .then((data: any) => {
        console.log(data);
        if (data.msg == 1) {
          setMotivationalTips({ tips: data.tips });
        } else {
          alert(data.msg);
        }
      });
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h1" style={{fontFamily: "georgia", fontWeight: "bold" }}>
          Motivational Tips for you
        </Typography>
        <Typography variant="body2" component="p">
          {motivationalTips.tips}
        </Typography>
      </CardContent>
    </Card>
  );
}