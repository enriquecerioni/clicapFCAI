const express = require('express');
const router = express.Router();
const DateController = require('../controllers/DateController');
router.get('/get',DateController.getEventDate);
router.put('/edit/:timestamp',DateController.updateDate);

module.exports = router;