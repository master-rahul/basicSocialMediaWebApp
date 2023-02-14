const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')


router.get('/signIn', userController.signIn)
router.get('/signUp', userController.signUp)
router.get('/add', userController.add)
router.get('/remove', userController.remove)

module.exports = router