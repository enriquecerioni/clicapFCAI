const express = require('express');
const router = express.Router();
const NewController = require('../controllers/NewController');
const auth = require("../middlewares/authMiddleware");

router.get('/getall',auth.verifyToken, NewController.getAllNews);
router.post('/create', auth.verifyToken, NewController.create);
router.delete('/delete/:id', auth.verifyToken, NewController.delete);

module.exports = router;