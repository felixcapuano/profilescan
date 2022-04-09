const router = require("express").Router();
const steamInstance = require("../instance/steam");
// const { pullCache, pushCache } = require("../handler/cache");
const response = require("../handler/response");
const isValidSteamId = require("../handler/verifySteamId");

const fetchBans = async (steamids) => {
  const { data } = await steamInstance.get(
    "/ISteamUser/GetPlayerBans/v0001/",
    { params: { steamids, }, }
  );

  console.log(data)
  return data.players.filter(({ VACBanned }) => VACBanned === true).length;
}

const getPlayerBans = async (req, res, next) => {
  if (req.data) return await next();

  let friends = [];
  try {
    const { data } = await steamInstance.get(
      "/ISteamUser/GetFriendList/v0001/",
      {
        params: {
          relationship: "friend",
          steamid: req.params.id,
        },
      }
    );

    friends = data.friendslist.friends;

    req.data = {
      userVacBanned: await fetchBans(req.params.id),
      friendCount: friends.length,
      friendBanned: 0,
    };

    while (friends.length > 0) {
      const friendsSlice = friends.splice(-100);
      const friendsString = friendsSlice.map((f) => f.steamid).join("-");
      req.data.friendBanned += await fetchBans(friendsString);
    }
  } catch (error) {
    console.log(error)
    return await next({ status: 404 });
  }

  return await next();
};

router.get("/getplayerbans/:id/", [
  isValidSteamId,
  // pullCache,
  getPlayerBans,
  // pushCache,
  response,
]);

module.exports = router;
