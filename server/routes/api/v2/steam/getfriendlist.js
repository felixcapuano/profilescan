const router = require("express").Router();
const steamInstance = require("../instance/steam");
const { pullCache, pushCache } = require("../handler/cache");
const response = require('../handler/response');

const getFrientList = async (req, res, next) => {
  if (req.cached) await next()

  const steamResponse = await steamInstance.get(
    "/ISteamUser/GetFriendList/v0001/",
    {
      params: {
        relationship: "friend",
        steamid: req.params.id,
      },
    }
  );
  req.data = steamResponse.data.friendslist;


  await next();
}

router.get("/getfriendlist/:id/", [
  pullCache,
  getFrientList,
  pushCache,
  response,
]);

module.exports = router;
