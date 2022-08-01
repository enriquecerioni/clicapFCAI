const express = require('express');
const router = express.Router();
const JobController = require('../controllers/JobController');

router.post('/create', JobController.upload);
router.put('/edit/:id',JobController.updateById);
router.get('/get/:id',JobController.getById);
router.get('/get/job/:page',JobController.getAllPaginated);
router.get('/getall',JobController.getAll);
router.delete('/delete/:id',JobController.deleteById);


module.exports = router;