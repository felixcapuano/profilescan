const router = require("express").Router();
const steamInstance = require("../instance/steam");
const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");

const getUserStatsForGame = async (req, res, next) => {
  if (req.cached) await next();

  try {
    const steamRes = await steamInstance.get(
      "/ISteamUserStats/GetUserStatsForGame/v0002/",
      {
        params: {
          appid: "730",
          steamid: req.params.id,
        },
      }
    );

    req.data = steamRes.data.playerstats;
  } catch (error) {
    await next(error);
  }
  await next();
};

router.get("/getuserstatsforgame/:id/", [
  pullCache,
  getUserStatsForGame,
  pushCache,
  response,
]);

module.exports = router;
