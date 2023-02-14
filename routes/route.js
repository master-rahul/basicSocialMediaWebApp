const express = require('express')
const router = express.Router()     // fetching Router method from express
const routeController = require('../controllers/route')

router.use('/user/', require('./user'))
router.use('/session/', require('./session'))
router.use('/post/', require('./post'))
router.use('/profile/', require('./profile'))

router.get('/', routeController.home)

module.exports = router;