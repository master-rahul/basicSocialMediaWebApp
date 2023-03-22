const express = require('express');
const router = express.Router();
const sessionAPI = require('../../../controllers/api/v2/session_api');

router.post('/create/', sessionAPI.create);
router.get('/destroy/:id', sessionAPI.destroy);

module.exports = router;