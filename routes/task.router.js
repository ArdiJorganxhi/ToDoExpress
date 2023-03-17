const taskController = require("../controllers/task.controller.js");
const router = require("express").Router();
const { verifyLogin } = require("../common");

router.post("/", verifyLogin, taskController.addTask);
router.get("/", verifyLogin, taskController.findAllTasks);
router.get("/:id", verifyLogin, taskController.findTaskById);
router.delete("/:id", verifyLogin, taskController.deleteTask);

module.exports = router;
