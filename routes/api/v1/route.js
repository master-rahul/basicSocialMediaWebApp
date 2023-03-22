const express = require('express');
const router = express.Router();

router.use('/posts/', require('./posts'));
router.use('/session/', require('./session'));

module.exports = router;