import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { requestPost} from "../../../utils/request";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
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

export default function EnterMotiTips() {
  const classes = useStyles();
  const [motivationalTips, setMotivationalTips] = React.useState({
    tips: "",
    sendTime: Date.now()
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await requestPost("http://localhost:5000/addMotivationalTips", motivationalTips);
    const jsonResult = await res.json();
        alert(jsonResult.msg);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
                rows="10"
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
    </Container>
  );
}
