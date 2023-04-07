const express = require('express');
const router = express.Router();     // fetching Router method from express
const routeController = require('../controllers/route');
const passport = require('../config/passport_local_strategy');

router.use('/user/', require('./user'));
router.use('/session/', require('./session'));
router.use('/post/', require('./post'));
router.use('/comment/', require('./comment'));
router.use('/api/', require('./api/route'));
router.get('/',routeController.home)
router.get('/mailer', routeController.mailer)
router.get('/getMail', routeController.getMail)


module.exports = router;