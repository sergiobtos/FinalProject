var nurse = require('../controllers/nurse.server.controller');

module.exports = function(app){

    //Post and Get VitalSigns in Nurse role
    app.post("/saveVitalSigns", nurse.addVitalSignsRender);
    app.get("/retrieveVitalSigns", nurse.getVitalSignsRender );

    //Post and Get Daily Motivational Tips in Nurse role
    app.post("/enterMotivationalTips", nurse.addMotivationalTipsRender);

    // Try to implement Emergency Alert
    app.get('/getAllActiveEAlert',nurse.getAllEmergencyAlert);
    app.post('/answerAlert',nurse.answerAlert);
};
