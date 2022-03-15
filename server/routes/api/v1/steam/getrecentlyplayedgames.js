const router = require("express").Router();
const steamInstance = require("./steamInstance");

router.get("/getrecentlyplayedgames/:steamid/", async (req, res) => {
  try {
    const steamResponse = await steamInstance.get(
      "/IPlayerService/GetRecentlyPlayedGames/v0001/",
      {
        params: {
          format: "json",
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
    const errorMsg =
      "The steam id is invalid or player has no recent played games.";
    console.error(`GET ${req.originalUrl} "${erroMsg}"`);
    return await res.status(404).send(errorMsg);
  }
});

module.exports = router;
