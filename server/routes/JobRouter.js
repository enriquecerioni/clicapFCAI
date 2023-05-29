const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");

router.post("/create", JobController.upload);
router.put("/edit/:id", JobController.updateById);
router.put("/setcorrection/:id", JobController.setStatusJob);
router.get("/get/:id", JobController.getById);
router.get("/export/jobs", JobController.downloadFilter);
router.get("/get/jobs/:page", JobController.getAllPaginated);
router.get("/getjobs/byuser", JobController.getAllJobsByUser);
router.get("/getall", JobController.getAll);
router.get("/getamountjobs", JobController.getAmountJobs);
router.delete("/delete/:id", JobController.deleteById);
router.get("/downloadfile", JobController.downloadFile);

module.exports = router;
