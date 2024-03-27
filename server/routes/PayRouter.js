const express = require("express");
const router = express.Router();
const PayController = require("../controllers/PayController");
const auth = require("../middlewares/authMiddleware");

router.post("/create",auth.verifyToken, PayController.create);
router.post("/edit/invoice/:id", auth.verifyToken, PayController.updateInvoice);
router.get("/get/:id", auth.verifyToken, PayController.getById);
router.get("/get/author/:authorId", auth.verifyToken, PayController.getByAuthorId);
router.get("/get/pay/:page", auth.verifyToken, PayController.getAllPaginated);
router.get("/get/pays/:page", auth.verifyToken, PayController.getAllPaginatedWithFilter);
router.get("/getall", auth.verifyToken, PayController.getAll);
router.delete("/delete/:id", auth.verifyToken, PayController.deleteById);
router.get("/export/pays", auth.verifyToken, PayController.downloadFilter);

module.exports = router;
