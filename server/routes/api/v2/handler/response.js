const logger = require("../../../../logging");

const response = async (req, res) => {
  logger.info({ url: req.originalUrl, cached: "cacheTime" in req.data });

  await res
    .contentType("application/json")
    .status(req.data ? 200 : 404)
    .send(req.data);
};

module.exports = response;
