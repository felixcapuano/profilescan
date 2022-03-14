const router = require('express').Router();
const axios = require('axios');

const findId = async (req, res, next) => {
  req.steamLink = `https://steamcommunity.com/${req.originalUrl}`;
  const steamPage = await axios.get(req.steamLink);

  if (steamPage.data.match(/<title>Steam Community :: Error<\/title>/)) {
    console.error(`GET ${req.originalUrl} Steam profile not found`);
    return res.status(404).send(`${req.params.userId} Steam profile not found`);
  }

  const match = [
    ...steamPage.data.matchAll(/g_rgProfileData = (?<profileData>{.*})/g),
  ];
  if (!match) {
    console.error(`GET ${req.originalUrl} Steam id not found in page`);
    return res.status(500).send(`${req.params.userId} Internal error`);
  }

  const { steamid } = JSON.parse(match[0].groups.profileData);
  if (!steamid) {
    console.error(`GET ${req.originalUrl} Steamid not found in match`);
    return res.status(500).send(`${req.params.userId} Internal error`);
  }

  req.steamId = steamid;
  next();
};

const faceitfinderRedirect = (req, res) => {
  const faceitfinderUrl = `https://faceitfinder.com/profile/${req.steamId}`;
  console.log(`GET ${faceitfinderUrl}`);
  res.redirect(faceitfinderUrl);
};

router.get('/:pi(profiles|id)/:userId', findId, faceitfinderRedirect);

module.exports = router;