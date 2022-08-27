const Patient = require('../../../models/patients');
const Report = require('../../../models/reports');


module.exports = {
    //create report
    createReport: async function (req, res) {
        try {
            let id = req.params.id;
            const patient = await Patient.findById(id);
            console.log(id);
            if (!patient) {
                return res.json(400, {
                    message: "patient dont exist  "
                });
            } //create report
            const report = await Report.create({
                patient: id,
                doctor: req.user.id,
                status: req.body.status,
                date: req.body.date
            });

            //return report
            return res.json(200, {
                data: {
                    report: report
                },
                message: "Report Created"
            });
        } catch (error) {
            return res.json(500, {
                message: "Internal Server Error" + error
            });
        }
    },

    //get all reports  
    getAll: async function (req, res) {
        try {

            //find parent
            let id = req.params.id;
            const patient = await Patient.findById(id);
            console.log(id);
            
            //if not a patient
            if (!patient) {
                return res.json(400, {
                    message: "patient dont exist  "
                });
            }
            const reports = await Report.find({
                    patient: id
                })
                .populate("patient")
                

                //return report
            return res.json(200, {
                data: {
                    reports: reports
                },
                message: "Reports"
            });
        } catch (error) {
            return res.json(500, {
                message: "Internal Server Error" + error
            });

        }
    },

   
}