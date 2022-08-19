const express = require('express');
const router = express.Router();
const JobModalityController = require('../controllers/JobModalityController');
router.post('/create',JobModalityController.create);
router.put('/edit/:id',JobModalityController.updateById);
router.get('/get/:id',JobModalityController.getById);
router.get('/getall',JobModalityController.getAll);
router.delete('/delete/:id',JobModalityController.deleteById);


module.exports = router;