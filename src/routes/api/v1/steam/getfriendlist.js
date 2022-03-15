const router = require("express").Router();
const steamInstance = require("./steamInstance");

router.get("/getfriendlist/:steamid/", async (req, res) => {
  try {
    const steamResponse = await steamInstance.get(
      "/ISteamUser/GetFriendList/v0001/",
      {
        params: {
          relationship: "friend",
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
    const errorMsg = "The steam id is invalid or player has no friend.";
    console.error(`GET ${req.originalUrl} "${errorMsg}"`);
    return await res.status(404).send(errorMsg);
  }
});

module.exports = router;
