const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
router.post('/create',UserController.create);
router.put('/edit/:id',UserController.updateById);
router.get('/get/:id',UserController.getById);
router.get('/getall',UserController.getAll);
router.delete('/delete/:id',UserController.deleteById);


module.exports = router;