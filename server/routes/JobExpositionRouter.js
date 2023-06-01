const express = require("express");
const router = express.Router();
const JobExpositionController = require("../controllers/JobExpositionController");
router.post("/create", JobExpositionController.create);
router.put("/edit/:id", JobExpositionController.updateById);
router.get("/get/:id", JobExpositionController.getById);
router.get("/getall", JobExpositionController.getAll);
router.delete("/delete/:id", JobExpositionController.deleteById);

module.exports = router;
