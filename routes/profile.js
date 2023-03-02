const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile');
const passport = require('../config/passport_local_strategy');

router.get('/', passport.checkAuthentication, passport.decodeCookie, profileController.profile);

module.exports = router;