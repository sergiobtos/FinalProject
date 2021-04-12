var patient = require('../controllers/patient.server.controller');

module.exports = function(app){
    
    app.get("/retrieveMotiTips", patient.retrieveMotivationalTipsRender);
    
    app.post('/sendEmergencyAlert', patient.sendEmergencyAlert);

    app.post('/sendSymptomList',patient.commonSignsChecklist);
};