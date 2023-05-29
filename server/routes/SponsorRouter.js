const express = require("express");
const router = express.Router();
const SponsorController = require("../controllers/SponsorController");
router.get("/getall", SponsorController.getAll);
router.post("/create", SponsorController.create);
router.delete("/delete/:id", SponsorController.delete);

module.exports = router;
