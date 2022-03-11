const express = require('express');
const axios = require('axios');

const app = express();

const findId = async (req, res, next) => {
  req.steamLink = `https://steamcommunity.com/${req.originalUrl}`;
  const steamPage = await axios.get(req.steamLink);

  if (steamPage.data.match(/<title>Steam Community :: Error<\/title>/)) {
    return res.status(404).send('Profile not found');
  }

  const match = [
    ...steamPage.data.matchAll(/g_rgProfileData = (?<profileData>{.*})/g),
  ];

  const { steamid } = JSON.parse(match[0].groups.profileData);

  req.steamId = steamid;
  next();
};

const faceitfinderRedirect = (req, res) => {
  res.redirect(`https://faceitfinder.com/profile/${req.steamId}`);
};

app.get('/:pi(profiles|id)/:userId', findId, faceitfinderRedirect);

app.get('/', (req, res) => res.send('hello world`<br>nothing much to do here'));

module.exports = app;
