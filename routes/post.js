const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.get('/create', postController.create);
router.get('/edit', postController.edit);
router.get('/delete', postController.delete);
router.get('/hide', postController.hide);

module.exports = router;