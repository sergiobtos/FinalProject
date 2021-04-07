// import express, cors and body-parser
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

const signupController = require("./controllers/signupController");
const signinController = require("./controllers/signinController");
const enterMotiTipsController = require("./controllers/enterMotiTipsController");
const retrieveMotiTipsController = require("./controllers/retrieveMotiTipsController");
const enterViatlSignsController = require("./controllers/enterVitalSigns");
const retrieveViatlSignsController = require("./controllers/retrieveVitalSigns");
const retrieveVideosController = require('./controllers/retrieveVideosController');
const sendEmergencyAlertCtrler = require('./controllers/EmergencyAlertController');
const SymptomCtrler = require('./controllers/SymptomDiagnosisController');
app.use(cors());
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

// call registration api
app.post("/signup", signupController.signupRender);

// call login api
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
app.listen(8500, function() {
  console.log("Server app listening on http://localhost:8500/");
});
