//require
const express = require('express');
const port=8000;
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const app = express();
const passport = require("passport");
const passportJwt = require("./config/passport-jwt-startegy");

app.use(bodyParser.urlencoded());

//routes
app.use("/", require("./routes"));

//server
app.listen(port, function () {
    console.log(`Server listening on port ${8000}`);
});


module.exports =app;