const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session');
const passport = require('../config/passport_local_strategy')

router.post('/create', passport.authenticate('local', { failureRedirect: '/user/signIn' }) , sessionController.create);
router.get('/destroy', sessionController.destroy);

module.exports = router;