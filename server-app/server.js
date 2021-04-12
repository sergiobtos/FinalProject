process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

var express = require('./config/express');

const enterMotiTipsController = require("./controllers/enterMotiTipsController");
const retrieveMotiTipsController = require("./controllers/retrieveMotiTipsController");
//const retrieveViatlSignsController = require("./controllers/retrieveVitalSigns");
const sendEmergencyAlertCtrler = require('./controllers/EmergencyAlertController');
const SymptomCtrler = require('./controllers/SymptomDiagnosisController');

var app = express();

app.post("/enterMotiTips", enterMotiTipsController.enterMotiTipsRender);
app.get("/retrieveMotiTips", retrieveMotiTipsController.retrieveMotiTipsRender);
//app.post("/retrieveVitalSigns", retrieveViatlSignsController.retrieveVitalSignsRender );
app.post('/sendEmergencyAlert',sendEmergencyAlertCtrler.sendEAlert);
app.get('/getAllActiveEAlert',sendEmergencyAlertCtrler.getAllActiveEAlert);
app.post('/answerAlert',sendEmergencyAlertCtrler.answerAlert);
app.post('/sendSymptomList',SymptomCtrler.sendSymptomList);


app.listen(PORT, ()=> {
  console.log("Server running on http://localhost:"+PORT);
});

//module.exports = app;
