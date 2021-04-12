var nurse = require('../controllers/nurse.server.controller');

module.exports = function(app){

    app.post("/saveVitalSigns", nurse.addVitalSignsRender);

    app.get("/retrieveVitalSigns", nurse.getVitalSignsRender );
};
