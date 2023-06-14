const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
router.post('/create',PaymentController.create);
router.put('/edit/:id',PaymentController.updateById);
router.get('/get/:id',PaymentController.getById);
router.get('/getall',PaymentController.getAll);
router.delete('/delete/:id',PaymentController.deleteById);

module.exports = router;