const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session');

router.get('/create', sessionController.create);
router.get('/destroy', sessionController.destroy);

module.exports = router;