const express = require("express");
const router = express.Router();
const SponsorController = require("../controllers/SponsorController");
const auth = require("../middlewares/authMiddleware");

router.get("/getall", SponsorController.getAll);
router.post("/create", auth.verifyToken, SponsorController.create);
router.delete("/delete/:id", auth.verifyToken, SponsorController.delete);

module.exports = router;
