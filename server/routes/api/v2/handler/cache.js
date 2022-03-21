const client = require("../instance/redis");

const pullCache = async (req, res, next) => {
  // if (!connected) next();

  const path = req.path.split("/");
  req.cacheKey = `${path[1]}_${path[2]}`;

  try {
    const data = await client.get(req.cacheKey);
    if (data) {
      req.data = data;
      req.cached = true;
    }
  } catch (error) {
    await next(error);
  }

  await next();
};

const pushCache = async (req, res, next) => {
  if (req.cached) await next();
  if (!req.cacheKey) {
    //|| !connected) { //maybe use .ping()
    console.warn("Skipping : cache middleware missing");
    await next();
  }

  try {
    await client.setEx(req.cacheKey, 3600 * 24, JSON.stringify(req.data));
  } catch (error) {
    await next(error);
  }

  await next();
};

module.exports = { pullCache, pushCache };
