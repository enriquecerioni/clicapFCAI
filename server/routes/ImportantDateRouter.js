const express = require("express");
const router = express.Router();
const ImportantDateController = require("../controllers/ImportantDateController");
const auth = require("../middlewares/authMiddleware");

router.post("/create",auth.verifyToken, ImportantDateController.create);
router.put("/edit/:id", auth.verifyToken, ImportantDateController.updateById);
router.get("/get/:id", auth.verifyToken, ImportantDateController.getById);
router.get("/getall", auth.verifyToken, ImportantDateController.getAll);
router.delete("/delete/:id", auth.verifyToken, ImportantDateController.deleteById);

module.exports = router;
