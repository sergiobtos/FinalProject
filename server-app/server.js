process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

var express = require('./config/express');

const signupController = require("./controllers/signupController");
const signinController = require("./controllers/signinController");
const enterMotiTipsController = require("./controllers/enterMotiTipsController");
const retrieveMotiTipsController = require("./controllers/retrieveMotiTipsController");
const enterViatlSignsController = require("./controllers/enterVitalSigns");
const retrieveViatlSignsController = require("./controllers/retrieveVitalSigns");
const retrieveVideosController = require('./controllers/retrieveVideosController');
const sendEmergencyAlertCtrler = require('./controllers/EmergencyAlertController');
const SymptomCtrler = require('./controllers/SymptomDiagnosisController');

var app = express();


app.post("/signup", signupController.signupRender);
app.post("/signin", signinController.signinRender);
app.post("/enterMotiTips", enterMotiTipsController.enterMotiTipsRender);
app.get("/retrieveMotiTips", retrieveMotiTipsController.retrieveMotiTipsRender);
app.post("/saveVitalSigns", enterViatlSignsController.enterViatlSignsRender );
app.post("/retrieveVitalSigns", retrieveViatlSignsController.retrieveVitalSignsRender );
app.get("/retrieveVideos",retrieveVideosController.retrieveVideos);
app.post('/sendEmergencyAlert',sendEmergencyAlertCtrler.sendEAlert);
app.get('/getAllActiveEAlert',sendEmergencyAlertCtrler.getAllActiveEAlert);
app.post('/answerAlert',sendEmergencyAlertCtrler.answerAlert);
app.post('/sendSymptomList',SymptomCtrler.sendSymptomList);


app.listen(PORT, ()=> {
  console.log("Server running on http://localhost:"+PORT);
});
