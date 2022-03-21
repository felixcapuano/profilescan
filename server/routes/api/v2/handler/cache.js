const { client, redisConnected } = require("../instance/redis");

const pullCache = async (req, res, next) => {
  if (redisConnected === false) {
    return await next();
  }

  const path = req.path.split("/");
  req.cacheKey = `${path[1]}_${path[2]}`;

  try {
    const data = await client.get(req.cacheKey);
    if (data) {
      req.data = data;
      req.cached = true;
    }
  } catch (error) {
    return await next(error);
  }

  return await next();
};

const pushCache = async (req, res, next) => {
  if (req.cached || redisConnected === false || !req.cacheKey) {
    return await next();
  }

  try {
    await client.setEx(req.cacheKey, 3600 * 24, JSON.stringify(req.data));
  } catch (error) {
    return await next(error);
  }

  await next();
};

module.exports = { pullCache, pushCache };
