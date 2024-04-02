const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/authMiddleware");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/acount-activate/:token", UserController.acountActivate);
router.put("/edit/:id",auth.verifyToken, auth.verifyToken, UserController.updateById);
router.get("/get/:id", auth.verifyToken, UserController.getById);
router.get("/getallevaluators", auth.verifyToken, UserController.getAllEvaluators);
router.get("/getall", auth.verifyToken, UserController.getAll);
router.get("/get/users/:page", auth.verifyToken, UserController.getAllPaginated);
router.get("/export/users", auth.verifyToken, UserController.downloadFilter);
router.delete("/delete/:id", auth.verifyToken, UserController.deleteById);

module.exports = router;
