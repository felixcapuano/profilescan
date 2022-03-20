const router = require("express").Router();
const error = require("./handler/error");

router.use("/steam", require("./steam"));
// router.use('/steam', require('./faceit'))

router.use(error);

module.exports = router;
