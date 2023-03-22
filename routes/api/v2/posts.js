const express = require('express');
const router = express.Router();
const postAPI = require('../../../controllers/api/v2/posts_api');

router.get('/', postAPI.posts);
router.delete('/:id', postAPI.delete);

module.exports = router;