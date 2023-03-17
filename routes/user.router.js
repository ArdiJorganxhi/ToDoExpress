const userController = require('../controllers/user.controller.js')
const router = require('express').Router();
const {verifyLogin} = require('../common')


router.get('/', verifyLogin, userController.findAll)
router.get('/:id', verifyLogin, userController.findById)
router.delete('/:id', verifyLogin, userController.deleteUser)

module.exports = router