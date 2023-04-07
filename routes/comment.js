const express = require('express');
const router = express.Router();
const passport = require('../config/passport_local_strategy');
const commentController = require('../controllers/comment');

router.get('/delete/:id', passport.checkAuthentication, commentController.delete);
//router.post('/create', passport.checkAuthentication, commentController.create);
router.post('/create',  commentController.create);


module.exports = router;