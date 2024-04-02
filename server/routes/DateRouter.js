const express = require('express');
const router = express.Router();
const DateController = require('../controllers/DateController');
const auth = require("../middlewares/authMiddleware");

router.get('/get', DateController.getEventDate);
router.put('/edit/:timestamp',auth.verifyToken, DateController.updateDate);
router.put('/edit/deadline/:days',auth.verifyToken, DateController.updateDeadlineDays);

module.exports = router;