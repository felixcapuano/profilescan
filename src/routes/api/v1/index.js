const router = require('express').Router();

router.use('/steam', require('./steam'))
// router.use('/v1', require('./faceit'))

module.exports = router;