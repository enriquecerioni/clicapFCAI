const express = require("express");
const router = express.Router();
const CertificateController = require("../controllers/CertificateController");
router.post("/create", CertificateController.create);
router.put("/edit/:id", CertificateController.updateById);
router.get("/get/:id", CertificateController.getById);
router.get("/getall", CertificateController.getAll);
router.get("/getcertificatelogo/:name", CertificateController.getCertificateLogo);
router.post("/savelogo", CertificateController.saveLogosApp);
router.delete("/delete/:id", CertificateController.deleteById);

module.exports = router;
