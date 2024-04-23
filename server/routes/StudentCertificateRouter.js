const express = require("express");
const router = express.Router();
const StudentCertificateController = require("../controllers/StudentCertificateController");
const auth = require("../middlewares/authMiddleware");

router.post("/create",auth.verifyToken, StudentCertificateController.create);
router.put("/edit/:id", auth.verifyToken, StudentCertificateController.updateById);
router.get("/get/:id", auth.verifyToken, StudentCertificateController.getById);
router.get("/getall", auth.verifyToken, StudentCertificateController.getAll);
router.get("/get/paginated/:page", auth.verifyToken, StudentCertificateController.getAllPaginated);
router.get("/getall/:userId", auth.verifyToken, StudentCertificateController.getAllByUser);
router.delete("/delete/:id", auth.verifyToken, StudentCertificateController.deleteById);

module.exports = router;
