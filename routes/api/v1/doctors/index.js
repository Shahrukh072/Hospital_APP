const express = require('express');
const router = express.Router();
const doctorController = require('../../../../controllers/api/v1/doctorsController');

//doctor routes
router.post('/register', doctorController.register);
router.post('/login', doctorController.login);


//export router
module.exports = router;