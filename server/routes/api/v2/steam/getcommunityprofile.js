const router = require("express").Router();
const { parseStringPromise } = require("xml2js");
const axios = require("axios");
const response = require("../handler/response");

const getCommunityProfile = async (req, res, next) => {
  if (req.cached) await next();
  if (!req.query.path) return await next({ status: 400 });

  req.steamLink = `https://steamcommunity.com/${req.query.path}?xml=1`;

  try {
    const steamPageXml = await axios.get(req.steamLink);
    const { profile } = await parseStringPromise(steamPageXml.data);
    req.data = profile;
  } catch (error) {
    return await next({ status: 404 });
  }

  return await next();
};

router.get("/getcommunityprofile", [
  // pullCache,
  getCommunityProfile,
  // pushCache,
  response,
]);

module.exports = router;
