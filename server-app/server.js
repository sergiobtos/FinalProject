process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

var express = require('./config/express');

var app = express();


app.listen(PORT, ()=> {
  console.log("Server running on http://localhost:"+PORT);
});

