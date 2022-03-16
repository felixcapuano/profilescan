const router = require("express").Router();
const redisClient = require("./redisInstance");

router.use("/api", require("./api"));
// router.use("/:pi(profiles|id)", require("./profiles_id"));

module.exports = router;
