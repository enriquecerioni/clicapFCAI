const express = require("express");
const router = express.Router();
const AreaController = require("../controllers/AreaController");
const auth = require("../middlewares/authMiddleware");

router.post("/create", auth.verifyToken, AreaController.create);
router.put("/edit/:id", auth.verifyToken, AreaController.updateById);
router.get("/get/:id", auth.verifyToken, AreaController.getById);
router.get("/getall", AreaController.getAll);
router.delete("/delete/:id", auth.verifyToken, AreaController.deleteById);

module.exports = router;
