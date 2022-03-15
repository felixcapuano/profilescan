const router = require("express").Router();

router.use(require("./getfriendlist"));
router.use(require("./getplayerachievements"));
router.use(require("./getplayersummaries"));
router.use(require("./getrecentlyplayedgames"));

module.exports = router;
