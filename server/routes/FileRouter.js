const express = require('express');
const router = express.Router();
const FileController = require('../controllers/FileController');

router.get('/delete-file',FileController.deleteFile);

module.exports = router;