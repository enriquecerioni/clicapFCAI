const express = require("express");
const router = express.Router();
const JobDetailController = require("../controllers/JobDetailController");
const auth = require("../middlewares/authMiddleware");

router.post("/create",auth.verifyToken, JobDetailController.create);
router.put("/edit/:id", auth.verifyToken, JobDetailController.updateById);
router.get("/check/:jobId/:evaluatorId/:correctionNumber",auth.verifyToken,  JobDetailController.checkCorrection);
router.get("/get/:roleId/:jobId/:correctionNumber/", auth.verifyToken, JobDetailController.getById);
router.get("/getall", auth.verifyToken, JobDetailController.getAll);
router.delete("/delete/:id", auth.verifyToken, JobDetailController.deleteById);

module.exports = router;
