const userController = require('../controllers/userController.js');
const router = require('express').Router()

router.post('/registerUser', userController.registerUser)
router.post('/login', userController.login)

module.exports = router