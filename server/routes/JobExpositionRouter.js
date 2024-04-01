const express = require("express");
const router = express.Router();
const JobExpositionController = require("../controllers/JobExpositionController");
const auth = require("../middlewares/authMiddleware");

router.post("/create",auth.verifyToken, JobExpositionController.create);
router.put("/edit/:id", auth.verifyToken, JobExpositionController.updateById);
router.get("/get/:id", auth.verifyToken, JobExpositionController.getById);
router.get("/getall", JobExpositionController.getAll);
router.delete("/delete/:id", auth.verifyToken, JobExpositionController.deleteById);

module.exports = router;
