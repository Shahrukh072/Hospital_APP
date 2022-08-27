const Patient = require('../../../models/patients');

module.exports = {

    //register patient
    registerPatient: async function (req, res) {
        try {
            let patient = await Patient.findOne({
                number: req.body.number
            });

            //if already registered
            if (patient) {
                return res.json(200, {
                    data: {
                        patient: patient
                    },
                    message: "Patient already registered"
                });
            }
            patient = await Patient.create({
                number: req.body.number
            });

            //return patient
            return res.json(200, {
                data: {
                    patient: patient
                },
                message: "Successfully Created!"
            });
        } catch (error) {
            return res.json(500, {
                message: "Internal Server Error" + error
            });
        }
    }

}