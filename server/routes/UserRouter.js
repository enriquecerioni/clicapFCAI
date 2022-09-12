const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get("/acount-activate/:token", UserController.acountActivate);
router.put('/edit/:id',UserController.updateById);
router.get('/get/:id',UserController.getById);
router.get('/getallevaluators',UserController.getAllEvaluators);
router.get('/getall',UserController.getAll);
router.delete('/delete/:id',UserController.deleteById);


module.exports = router;