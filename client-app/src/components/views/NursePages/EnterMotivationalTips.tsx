import React, { useState} from "react";
import { Button, Paper, TextField} from "@material-ui/core";
import {CssBaseline, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { requestPost} from "../../../utils/request";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(0),
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  },
  typography: {
    marginBottom: theme.spacing(2)
  }
}));

export default function EnterMotivationalTips() {
  const classes = useStyles();

  const [result, setResult] = useState({
    msg : ""
  });

  const [motivationalTips, setMotivationalTips] = useState({
    tips: "",
    url: "",
    sendTime: Date.now()
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await requestPost("http://localhost:5000/addMotivationalTips", motivationalTips);
    const jsonResult = await res.json();
    setResult({msg: jsonResult.msg });
          setTimeout(function(){
            setResult({msg : ""});
            setMotivationalTips({...motivationalTips, tips : " ", url : " "});
          }, 1500);
  };

  return (
    <Container component="main" maxWidth="xs">
       <Paper className={classes.paper}  elevation={3} >
      <CssBaseline />
      {result.msg && (<div className="alert alert-success" role="alert">{result.msg}</div>)}
      <div className={classes.paper}>
        <Typography style={{ fontFamily: "georgia", fontWeight:'bold',color:'black'}} component="h1" variant="h5" className={classes.typography}>
          Enter Daily Motivational Tips
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows="7"
                id="motivationalTips"
                label="Motivational Tips"
                name="motivationalTips"
                value={motivationalTips.tips}
                onChange={(event: any) => {
                  setMotivationalTips({
                    ...motivationalTips,
                    tips: event.target.value,
                    sendTime: Date.now()
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
            <br></br>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="url"
                label="Enter Motivational Video Url"
                name="url"
                value={motivationalTips.url}
                onChange={(event: any) => {
                  setMotivationalTips({
                    ...motivationalTips,
                    url: event.target.value
                  });
                }}
              />
            </Grid>

          </Grid>
          <Button style={{color:'black',fontFamily:'georgia',backgroundColor:'green',fontWeight:'bold'}}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      </Paper>
    </Container>
  );
}
