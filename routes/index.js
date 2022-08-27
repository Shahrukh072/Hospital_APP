const express = require("express");
const router = express.Router();

//routes
router.use("/api", require("./api"));

module.exports = router;
