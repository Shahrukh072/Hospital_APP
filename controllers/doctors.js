const Doctor = require('../models/doctors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    //create user
    register: async function (req, res) {
        try {
            let doctor = await Doctor.findOne({
                name: req.body.name
            });
            if (doctor) {
                return res.json(400, {
                    message: "Bad Request"
                });
            }

            doctor = await Doctor.create(req.body);
            return res.json(200, {
                data: {
                    doctor: doctor
                },
                message: "Doctor created!"
            });
        } catch (error) {
            return res.json(500, {
                message: "Internal Server Error " + error
            });
        }
    },



    //authenticate user/login
    login: async function (req, res) {
        try {
            let doctor = await Doctor.findOne({
                email: req.body.email
            });
            if (bcrypt.compareSync(req.body.password, doctor.password)) {
                const token = jwt.sign({
                    id: doctor._id
                }, req.app.get('secretKey'), {
                    expiresIn: '2h'
                });

                res.json({
                    status: "Success",
                    message: "Logged in",
                    data: {
                        doctor: doctor,
                        token: token
                    }
                });
            } else {
                return res.json(422, {
                    message: "Invalid username or password"
                });
            }
        } catch (error) {
            return response.json(500, {
                message: "Internal Server Error " + error
            });
        }


    }
}