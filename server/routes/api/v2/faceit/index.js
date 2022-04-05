const router = require("express").Router();

router.use(require("./players"));
router.use(require("./stats"));

module.exports = router;
