const express = require('express');
const router = express.Router();
const StudentCertificateController = require('../controllers/StudentCertificateController');
router.post('/create',StudentCertificateController.create);
router.put('/edit/:id',StudentCertificateController.updateById);
router.get('/get/:id',StudentCertificateController.getById);
router.get('/getall',StudentCertificateController.getAll);
router.delete('/delete/:id',StudentCertificateController.deleteById);

module.exports = router;