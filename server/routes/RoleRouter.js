const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');
router.post('/create',RoleController.create);
router.put('/edit/:id',RoleController.updateById);
router.get('/get/:id',RoleController.getById);
router.get('/getall',RoleController.getAll);
router.delete('/delete/:id',RoleController.deleteById);

module.exports = router;