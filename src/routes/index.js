const router = require("express").Router();

router.use(require("./api"));
router.use("/:pi(profiles|id)", require("./profiles_id"));

module.exports = router;
