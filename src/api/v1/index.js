const router = require('express').Router();

router.use('/:id(profiles|id)', require('./profiles_id'))
router.use('/steam', require('./steam'))
// router.use('/v1', require('./faceit'))

module.exports = router;