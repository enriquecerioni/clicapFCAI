const express = require("express");
const router = express.Router();
const JobVersionController = require("../controllers/JobVersionController");
router.get("/get/:jobId", JobVersionController.getByJobId);

module.exports = router;
