const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");
const auth = require("../middlewares/authMiddleware");

router.post("/create", auth.verifyToken, PaymentController.create);
router.put("/edit/:id", auth.verifyToken, PaymentController.updateById);
router.get("/get/:id", auth.verifyToken, PaymentController.getById);
router.get("/getall", PaymentController.getAll);
router.delete("/delete/:id", auth.verifyToken, PaymentController.deleteById);

module.exports = router;
