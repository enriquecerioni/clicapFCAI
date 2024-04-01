const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");
const auth = require("../middlewares/authMiddleware");

router.post("/create",auth.verifyToken, JobController.upload);
router.put("/edit/:id", auth.verifyToken, JobController.updateById);
router.post("/upload", auth.verifyToken, JobController.uploadFileJob);
router.put("/setcorrection/:id", auth.verifyToken, JobController.setStatusJob);
router.get("/get/:id", auth.verifyToken, JobController.getById);
router.get("/export/jobs", auth.verifyToken, JobController.downloadFilter);
router.get("/get/author/:userId", auth.verifyToken, JobController.getByAuthorId);
router.get("/get/jobs/:page", auth.verifyToken, JobController.getAllPaginated);
router.get("/getjobs/byuser", auth.verifyToken, JobController.getAllJobsByUser);
router.get("/getall", auth.verifyToken, JobController.getAll);
router.get("/getamountjobs", auth.verifyToken, JobController.getAmountJobs);
router.get("/get/is-own-job/:jobId/:userId", auth.verifyToken, JobController.validateOwnJob);
router.delete("/delete/:id", auth.verifyToken, JobController.deleteById);
router.get("/downloadfile", auth.verifyToken, JobController.downloadFile);

module.exports = router;
