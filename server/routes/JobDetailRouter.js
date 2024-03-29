const express = require("express");
const router = express.Router();
const JobDetailController = require("../controllers/JobDetailController");
router.post("/create", JobDetailController.create);
router.put("/edit/:id", JobDetailController.updateById);
router.get("/check/:jobId/:evaluatorId/:correctionNumber", JobDetailController.checkCorrection);
router.get("/get/:roleId/:jobId/:correctionNumber/", JobDetailController.getById);
router.get("/getall", JobDetailController.getAll);
router.delete("/delete/:id", JobDetailController.deleteById);

module.exports = router;
