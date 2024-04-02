const express = require("express");
const router = express.Router();
const JobVersionController = require("../controllers/JobVersionController");
const auth = require("../middlewares/authMiddleware");

router.get("/get/:jobId",auth.verifyToken, JobVersionController.getByJobId);

module.exports = router;
