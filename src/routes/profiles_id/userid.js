const router = require('express').Router();
const axios = require('axios');
const { parseStringPromise } = require('xml2js');


const findId = async (req, res, next) => {
  // get the xml verion of the steam community page
  req.steamLink = `https://steamcommunity.com/${req.originalUrl}?xml=1`;
  let steamPageXml;
  try {
    steamPageXml = await axios.get(req.steamLink);
  } catch (error) {
    console.error(`GET ${req.originalUrl} "Bad url"`);
    return res.status(404).send(`${req.params.userId} Steam profile not found`);
  }

  // parse xml string to nice js object
  let steamPageObj;
  try {
    steamPageObj = await parseStringPromise(steamPageXml.data);
  }
  catch (error) {
    console.error(`GET ${req.originalUrl} "Failed to parse xml"`);
    return res.status(404).send(`${req.params.userId} Steam profile not found`);
  }

  if (steamPageObj?.response?.error) {
    console.error(`GET ${req.originalUrl} "${steamPageObj.response.error.toString()}"`);
    return res.status(404).send(`${req.params.userId} Steam profile not found`);
  }

  const { profile } = steamPageObj;
  if (!profile.steamID64) {
    console.error(`GET ${req.originalUrl} Steam id not found in page`);
    return res.status(500).send(`${req.params.userId} Internal error`);
  }

  req.steamId = profile.steamID64;
  next();
};

const faceitfinderRedirect = (req, res) => {
  const faceitfinderUrl = `https://faceitfinder.com/profile/${req.steamId}`;
  console.log(`GET ${faceitfinderUrl}`);
  res.redirect(faceitfinderUrl);
};

router.get('/:userId', findId, faceitfinderRedirect);

module.exports = router;