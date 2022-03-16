const { createClient } = require("redis");

const client = createClient({
  url: "redis://localhost:6379/",
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Redis Client Connected"));
client.connect();

const cache = async (req, res, next) => {
  const path = req.path.split("/");
  req.cacheKey = `${path[1]}_${path[2]}`;

  try {
    const data = await client.get(req.cacheKey);
    if (data) {
      console.log("found in cache");
      return res.send(JSON.parse(data));
    } else {
      console.log("not found in cache");
      return next();
    }
  } catch (error) {
    next();
  }
};

const cacheData = async (key, data) => {
  await client.setEx(key, 3600 * 24, JSON.stringify(data));
};

module.exports = { cache, cacheData };
