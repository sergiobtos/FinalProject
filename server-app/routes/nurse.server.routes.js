var nurse = require('../controllers/nurse.server.controller');
var auth = require('../middleware/auth');

module.exports = function(app){

    //Post and Get VitalSigns in Nurse role
    app.post("/createVitalSigns",auth, nurse.addVitalSignsRender);
    app.get("/getVitalSigns", auth, nurse.getVitalSignsRender );

    //Post and Get Daily Motivational Tips in Nurse role
    app.post("/addMotivationalTips", auth, nurse.addMotivationalTipsRender);

    // Try to implement Emergency Alert
    app.get('/getAllActiveEmergencyAlert', auth, nurse.getAllEmergencyAlert);
    app.post('/replyAlert', auth, nurse.replyAlert);
};
