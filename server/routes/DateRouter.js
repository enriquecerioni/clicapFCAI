const express = require('express');
const router = express.Router();
const DateController = require('../controllers/DateController');
router.get('/get',DateController.getEventDate);
router.put('/edit/:timestamp',DateController.updateDate);
router.put('/edit/deadline/:days',DateController.updateDeadlineDays);

module.exports = router;