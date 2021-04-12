var patient = require('../controllers/patient.server.controller');

module.exports = function(app){
    
    app.get("/getMotivationalTips", patient.getMotivationalTipsRender);
    
    app.post('/sendEmergencyAlert', patient.sendEmergencyAlert);

    app.post('/sendSymptomCheckList',patient.commonSignsChecklist);
};