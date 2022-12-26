const express = require('express');
const router = express.Router();
const RegularCertificateController = require('../controllers/RegularCertificateController');
router.post('/create',RegularCertificateController.create);
router.get('/get/:id',RegularCertificateController.getById);
router.get('/get/certificate/:page',RegularCertificateController.getAllPaginated);
router.get('/getall',RegularCertificateController.getAll);
router.delete('/delete/:id',RegularCertificateController.deleteById);

module.exports = router;