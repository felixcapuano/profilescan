const error = require("./handler/error");
const router = require("express").Router();

// router.use(error);
router.use("/steam", require("./steam"));
// router.use('/steam', require('./faceit'))

module.exports = router;
