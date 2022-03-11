const express = require('express');
const axios = require('axios');

const app = express();

const steamIdParser = async (req, res, next) => {
  const steamLink = `https://steamcommunity.com/id/${req.params.userId}`;
  const steamPage = await axios.get(steamLink);
  if (steamPage.data.match(/<title>Steam Community :: Error<\/title>/)) {
    return res.status(404).send('Profile not found');
  }

  const match = [
    ...steamPage.data.matchAll(/g_rgProfileData = (?<profileData>{.*})/g),
  ];

  const { steamid } = JSON.parse(match[0].groups.profileData);

  req.steamid = steamid;
  next();
};

const faceitfinderRedirect = (req, res) => {
  res.redirect(`https://faceitfinder.com/profile/${req['steamid']}`);
};

app.get('/id/:userId', steamIdParser, faceitfinderRedirect);

module.exports = app;
