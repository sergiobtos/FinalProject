import React from "react";
import { requestPost} from "../../../utils/request";
import {
  makeStyles,
  Theme,
  createStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    normalLab: {
      margin: theme.spacing(2),
    }
  }),
);

export default function CommonSignsCheckList() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    Cough: false,
    HighFever: false,
    Sniffle: false,
    Headache: false,
  });

  const [detail, setdetail] = React.useState([{ _id: "", disease: "", symptoms: [], description: "", tips: "" }]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const handleChecklist = async (e: any) => {
    let tsymptomList: string[] = [];
    Object.entries(state).map(([sym, yes]) => {
      if (yes)
        tsymptomList.push(sym.toString());

    });
    e.preventDefault();
    const res = await requestPost("http://localhost:5000/sendSymptomCheckList", tsymptomList);
    const jsonResult = await res.json();
        if (jsonResult.msg === 1) {
          // console.log(data.dataArr);
          setdetail(jsonResult.dataArr);
          alert("Sympotm sent! Waiting for the result!");
        } else {
          alert(jsonResult.msg);
        }
  }

  return (
    <div>
      <FormGroup style={{alignContent: "center", marginTop: "25px", fontFamily: "georgia", fontWeight: "bold"}}>
        <FormControlLabel
          control={<Checkbox checked={state.Cough} onChange={handleChange} name="Cough" />}
          label="Cough"
        />
        <FormControlLabel
          control={<Checkbox checked={state.HighFever} onChange={handleChange} name="HighFever" />}
          label="High Fever"
        />
        <FormControlLabel
          control={<Checkbox checked={state.Sniffle} onChange={handleChange} name="Sniffle" />}
          label="Sniffle"
        />
        <FormControlLabel
          control={<Checkbox checked={state.Headache} onChange={handleChange} name="Headache" />}
          label="Headache"
        />
      </FormGroup>

      <Button variant="contained" color="secondary" onClick={handleChecklist}
        style={{ color: "black", fontFamily: "georgia", backgroundColor: "green", fontWeight: "bold", marginLeft: "700px", marginTop: "15px" }} >
        Submit
      </Button>

      <Container>
        {detail.length > 0 && detail.map((result) => (
          <div key={result._id} className={classes.formControl}>
            <Typography variant="h6" gutterBottom>
              {result.disease}
            </Typography>

            <Typography variant="subtitle1" gutterBottom>
              {result.symptoms.map((sym) => (
                <label className={classes.normalLab} key={sym}>{sym}</label>
              ))}
            </Typography>

            <Typography variant="body1" gutterBottom>
              {result.description}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {result.tips}
            </Typography>
          </div>)
        )}
      </Container>
    </div>
  );
};