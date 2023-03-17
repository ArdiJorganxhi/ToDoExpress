const userController = require("../controllers/user.controller.js");
const router = require("express").Router();
const { verifyLogin } = require("../common");

router.get("/", verifyLogin, userController.findAll);
router.delete("/:id", verifyLogin, userController.deleteUser);
router.get("/tasks", verifyLogin, userController.getTasks);

module.exports = router;
