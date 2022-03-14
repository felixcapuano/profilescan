const router = require('express').Router();

router.get('/', (req, res) => res.send('hello world`<br>nothing much to do here'));

module.exports = router;