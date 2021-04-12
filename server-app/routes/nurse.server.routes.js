var nurse = require('../controllers/nurse.server.controller');

module.exports = function(app){

    //Post and Get VitalSigns in Nurse role
    app.post("/createVitalSigns", nurse.addVitalSignsRender);
    app.get("/getVitalSigns", nurse.getVitalSignsRender );

    //Post and Get Daily Motivational Tips in Nurse role
    app.post("/addMotivationalTips", nurse.addMotivationalTipsRender);

    // Try to implement Emergency Alert
    app.get('/getAllActiveEmergencyAlert',nurse.getAllEmergencyAlert);
    app.post('/replyAlert',nurse.replyAlert);
};
