const router = require("express").Router();
const steamInstance = require("../instance/steam");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");

const getFriendList = async (req, res, next) => {
  if (req.cached) await next();

  try {
    const steamRes = await steamInstance.get(
      "/ISteamUser/GetFriendList/v0001/",
      {
        params: {
          relationship: "friend",
          steamid: req.params.id,
        },
      }
    );
    req.data = steamRes.data.friendslist;
  } catch (error) {
    await next(error);
  }
  await next();
};

router.get("/getfriendlist/:id/", [
  pullCache,
  getFriendList,
  pushCache,
  response,
]);

module.exports = router;
