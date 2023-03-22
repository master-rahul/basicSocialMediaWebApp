const express = require('express');
const router = express.Router();

router.use('/v1/', require('./v1/route'));
router.use('/v2/', require('./v2/route'));


module.exports = router;