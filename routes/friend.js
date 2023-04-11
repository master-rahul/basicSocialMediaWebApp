const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend');
router.get('/add', friendController.add);
router.get('/accept', friendController.accept);
router.get('/remove', friendController.remove);


module.exports = router;