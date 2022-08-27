const express = require('express');
const router = express.Router();
const passport = require("passport");


//import controller
const patientController = require('../../../../controllers/api/v1/patientsController');
const reportsController = require('../../../../controllers/api/v1/reportsController');


//patient and report routes
router.post('/register_patient',passport.authenticate("jwt", { session: false }), patientController.registerPatient);
router.post('/:id/create_report',passport.authenticate("jwt", { session: false }), reportsController.createReport);
router.get('/:id/all_reports',passport.authenticate("jwt", { session: false }), reportsController.getAll);



//export router
module.exports = router;