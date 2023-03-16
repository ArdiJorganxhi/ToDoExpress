const userController = require("../controllers/user.controller.js")

const router = require("express").Router()

router.post('/register', userController.register)


module.exports = router