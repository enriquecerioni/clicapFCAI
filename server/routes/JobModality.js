const express = require('express');
const router = express.Router();
const JobModalityController = require('../controllers/JobModalityController');
const auth = require("../middlewares/authMiddleware");

router.post('/create',auth.verifyToken,JobModalityController.create);
router.put('/edit/:id',auth.verifyToken, JobModalityController.updateById);
router.get('/get/:id',auth.verifyToken, JobModalityController.getById);
router.get('/getall', JobModalityController.getAll);
router.delete('/delete/:id',auth.verifyToken, JobModalityController.deleteById);


module.exports = router;