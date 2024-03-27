const express = require("express");
const router = express.Router();
const FileController = require("../controllers/FileController");
const auth = require("../middlewares/authMiddleware");

router.get("/delete-file", auth.verifyToken, FileController.deleteFile);

module.exports = router;
