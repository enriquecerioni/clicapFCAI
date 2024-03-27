const express = require('express');
const router = express.Router();
const RegularCertificateController = require('../controllers/RegularCertificateController');
const auth = require("../middlewares/authMiddleware");

router.post('/create',auth.verifyToken, RegularCertificateController.create);
router.get('/get/:id',auth.verifyToken, RegularCertificateController.getById);
router.get('/get/certificate/:page',auth.verifyToken, RegularCertificateController.getAllPaginated);
router.get('/getall',auth.verifyToken, RegularCertificateController.getAll);
router.delete('/delete/:id',auth.verifyToken, RegularCertificateController.deleteById);

module.exports = router;