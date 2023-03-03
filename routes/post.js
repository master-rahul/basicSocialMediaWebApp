const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const passport = require('../config/passport_local_strategy')

router.post('/create', passport.checkAuthentication, postController.create);
router.post('/comment', passport.checkAuthentication, postController.comment);
router.post('/viewComments', postController.viewComments);
// router.get('/edit', passport.checkAuthentication, postController.edit);
// router.get('/delete', passport.checkAuthentication, postController.delete);
// router.get('/hide', passport.checkAuthentication, postController.hide);


module.exports = router;