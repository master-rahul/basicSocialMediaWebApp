const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const passport = require('../config/passport_local_strategy')

router.post('/create', passport.checkAuthentication, postController.create);
router.get('/delete/:id', passport.checkAuthentication, postController.delete);
router.post('/like', passport.checkAuthentication, postController.like);
router.post('/unlike', passport.checkAuthentication, postController.unlike);
// router.get('/edit', passport.checkAuthentication, postController.edit);
// router.get('/hide', passport.checkAuthentication, postController.hide);


module.exports = router;