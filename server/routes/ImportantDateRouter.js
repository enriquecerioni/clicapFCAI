const express = require("express");
const router = express.Router();
const ImportantDateController = require("../controllers/ImportantDateController");

router.post("/create", ImportantDateController.create);
router.put("/edit/:id", ImportantDateController.updateById);
router.get("/get/:id", ImportantDateController.getById);
router.get("/getall", ImportantDateController.getAll);
router.delete("/delete/:id", ImportantDateController.deleteById);

module.exports = router;
