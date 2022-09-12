const express = require('express');
const router = express.Router();
const PayController = require('../controllers/PayController');
router.post('/create',PayController.create);
router.post('/edit/invoice/:id',PayController.updateInvoice);
router.get('/get/:id',PayController.getById);
router.get('/get/pay/:page',PayController.getAllPaginated);
router.get('/getall',PayController.getAll);
router.delete('/delete/:id',PayController.deleteById);

module.exports = router;