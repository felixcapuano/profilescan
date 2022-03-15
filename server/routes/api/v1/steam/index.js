const router = require("express").Router();

router.use(require("./getfriendlist"));
router.use(require("./getplayerachievements"));
router.use(require("./getplayersummaries"));
router.use(require("./getrecentlyplayedgames"));
router.use(require("./findcommunityprofile"));

module.exports = router;
