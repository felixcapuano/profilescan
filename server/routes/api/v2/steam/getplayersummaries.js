const router = require("express").Router();
const steamInstance = require("./steamInstance");
const { pullCache, pushCache } = require("../redisInstance");
const response = require("../handler/response");
const isValidSteamId = require("../handler/verifySteamId");

const getPlayerSummaries = async (req, res) => {
  if (req.cached) await next();

  try {
    const steamRes = await steamInstance.get(
      "/ISteamUser/GetPlayerSummaries/v0002/",
      {
        params: {
          steamids: req.params.id,
        },
      }
    );

    req.data = steamRes.data.response;
  } catch (error) {
    await next(error);
  }
  await next();
};

router.get("/getplayersummaries/:id/", [
  isValidSteamId,
  pullCache,
  getPlayerSummaries,
  pushCache,
  response,
]);

module.exports = router;
