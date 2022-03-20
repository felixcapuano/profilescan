const router = require("express").Router();
const steamInstance = require("./steamInstance");
const { pullCache, pushCache } = require("../redisInstance");
const response = require("../handler/response");

const getPlayerAchievements = async (req, res, next) => {
  if (req.cached) await next();

  try {
    const steamRes = await steamInstance.get(
      "/ISteamUserStats/GetPlayerAchievements/v0001/",
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

router.get("/getplayerachievements/:id/", [
  pullCache,
  getPlayerAchievements,
  pushCache,
  response,
]);

module.exports = router;
