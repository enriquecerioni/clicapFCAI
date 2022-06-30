const express = require('express');
const router = express.Router();
const AreaController = require('../controllers/AreaController');
router.post('/create',AreaController.create);
router.put('/edit/:id',AreaController.updateById);
router.get('/get/:id',AreaController.getById);
router.get('/getall',AreaController.getAll);
router.delete('/delete/:id',AreaController.deleteById);


module.exports = router;