const express = require("express");
const router = express.Router();
const CertificateController = require("../controllers/CertificateController");
const auth = require("../middlewares/authMiddleware");

router.post("/create",auth.verifyToken, CertificateController.create);
router.put("/edit/:id", auth.verifyToken, CertificateController.updateById);
router.get("/get/:id", auth.verifyToken, CertificateController.getById);
router.get("/getall", auth.verifyToken, CertificateController.getAll);
router.get("/getcertificatelogo/:name", CertificateController.getCertificateLogo);
router.post("/savelogo", auth.verifyToken, CertificateController.saveLogosApp);
router.delete("/delete/:id", auth.verifyToken, CertificateController.deleteById);

module.exports = router;
