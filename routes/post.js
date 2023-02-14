const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const passport = require('../config/passport_local_strategy')

router.get('/create', passport.redirectAuthenticated, postController.create);
router.get('/edit', passport.redirectAuthenticated, postController.edit);
router.get('/delete', passport.redirectAuthenticated, postController.delete);
router.get('/hide', passport.redirectAuthenticated, postController.hide);

module.exports = router;