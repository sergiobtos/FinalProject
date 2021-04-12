var user = require('../controllers/user.server.controller');

module.exports = function(app){

    app.post('/signup', user.signupRender);

    app.post("/signin", user.signinRender);

    //app.get('/getAllPatients', user.findAllPatients);
};