// or  GetUserStatsForGame ???
const router = require("express").Router();
const steamInstance = require("./steamInstance");

router.get("/getplayerachievements/:steamid/", async (req, res) => {
  try {
    const steamResponse = await steamInstance.get(
      "/ISteamUserStats/GetUserStatsForGame/v0002/",
      {
        params: {
          appid: "730",
          steamid: req.params.steamid,
        },
      }
    );

    console.log(`GET ${req.originalUrl}`);
    return await res
      .status(200)
      .contentType("application/json")
      .send(steamResponse.data);
  } catch (error) {
    console.error(
      `GET ${req.originalUrl} "Steamid is invalid or/and player as no record for csgo."`
    );
    return await res
      .status(404)
      .send("The steam id is invalid or player as no record for csgo.");
  }
});

module.exports = router;
