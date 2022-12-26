const express = require('express');
const router = express.Router();
const NewController = require('../controllers/NewController');
router.get('/getall', NewController.getAllNews);
router.post('/create', NewController.create);
router.delete('/delete/:id', NewController.delete);

module.exports = router;