//require
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port=8000;
const db = require('./config/mongoose');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJwt = require("./config/passport-jwt-startegy");

app.use(bodyParser.urlencoded());

app.set('secretKey', 'api');
app.use(bodyParser.urlencoded({
    extended: false 
}));
app.use('/doctors', doctors);
app.use('/patients', validateUser, patients);


//validate jwt
function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.json({
                status: "error",
                message: err.message,
                data: null
            });
        } else {
            req.body.userId = decoded.id;
            next();
        }
    });
}

app.get('/', function (req, res) {
    res.json({
        "body": "hospital app"
    });
});


//routes
app.use("/", require("./routes"));

//server
app.listen(port, function () {
    console.log(`Server listening on port ${8000}`);
});


// module.exports =app;