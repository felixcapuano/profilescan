const isValidSteamId = async (req, res, next) => {
  if (req.params.id.match(/[0-9]{17}/g)) {
    await next();
  } else {
    await next({ status: 404 });
  }
};

module.exports = isValidSteamId;
