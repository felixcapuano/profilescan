const router = require("express").Router();
const isValidSteamId = require("../handler/verifySteamId");
const { pullCache, pushCache } = require("../handler/cache");
const steamInstance = require("../instance/steam");
const response = require("../handler/response");

const getRecentlyPlayedGames = async (req, res) => {
  if (req.cached) await next();

  try {
    const steamRes = await steamInstance.get(
      "/IPlayerService/GetRecentlyPlayedGames/v0001/",
      {
        params: {
          format: "json",
          steamid: req.params.id,
        },
      }
    );

    req.data = steamRes.data.response;
  } catch (error) {
    await next(error);
  }
  await next();
};

router.get("/getrecentlyplayedgames/:id/", [
  isValidSteamId,
  pullCache,
  getRecentlyPlayedGames,
  pushCache,
  response,
]);

module.exports = router;
