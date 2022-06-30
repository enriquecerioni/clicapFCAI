const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/DocumentController');
router.post('/create',DocumentController.create);
router.put('/edit/:id',DocumentController.updateById);
router.get('/get/:id',DocumentController.getById);
router.get('/getall',DocumentController.getAll);
router.delete('/delete/:id',DocumentController.deleteById);


module.exports = router;