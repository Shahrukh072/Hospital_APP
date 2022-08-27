//imports
const Doctor = require('../../../models/doctors');
const jwt = require("jsonwebtoken");
const bycrypt = require('bcrypt');

module.exports = {
    //create user
    register: async function (req, res) {
        try {
            let doctor = await Doctor.findOne({
                name: req.body.name
            });

            //if doctor exist,
            if (doctor) {
                return res.json(400, {
                    message: "Bad Request"
                });
            }

            //create doctor
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

      //match password
      if (!doctor ||bycrypt.compareSync( doctor.password , req.body.password)) {
        return res.json(422, {
          message: "Invalid username or password"
        });
      }


      //return token
      return res.json(200, {
        data: {
          doctor: doctor,
          token: jwt.sign(doctor.toJSON(), "covid", {
            expiresIn: "10000000"
          })
        },
        message: "Success!"
      });
        } catch (error) {
            return response.json(500, {
                message: "Internal Server Error " + error
            });
        }


    }
    
}