const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const passport = require('../config/passport_local_strategy')

router.get('/signIn', passport.redirectAuthenticated, userController.signIn);
router.get('/signUp', passport.redirectAuthenticated, userController.signUp);
router.post('/add', userController.add);
router.get('/remove', userController.remove);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.get('/profile', passport.checkAuthentication, userController.profile);

module.exports = router;
