var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser');
const cors = require('cors');

module.exports = function (){
    var app = express();

    if(process.env.NODE_ENV === "development"){
        app.use(morgan("dev"));
    }else if (process.env.NODE_ENV === "production"){
        app.use(compress());
    }

    app.use(
        bodyParser.urlencoded({
          extended: true,
        })
    );

    app.use(bodyParser.json());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    });

    const corsOptions = {
        origin: true,
        credentials: true,
    };
    app.use(cors(corsOptions));

    require('../routes/user.server.routes')(app);
    require('../routes/nurse.server.routes')(app);

    return app;
};
    