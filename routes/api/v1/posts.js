const express = require('express');
const router = express.Router();
const postAPI = require('../../../controllers/api/v1/posts_api');
const passport = require('passport');
router.get('/', postAPI.posts);
router.delete('/:id', passport.authenticate('jwt', {session : false}), postAPI.delete);

module.exports = router;