const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('./config/mongoose');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const jwt = require('jsonwebtoken');
const app = express();

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


app.listen(8080, function () {
    console.log('Node server listening on port 8080');
});