var patient = require('../controllers/patient.server.controller');
var auth = require('../middleware/auth');

module.exports = function(app){
    
    app.get("/getMotivationalTips",auth, patient.getMotivationalTipsRender);
    
    app.post('/sendEmergencyAlert',auth, patient.sendEmergencyAlert);
};