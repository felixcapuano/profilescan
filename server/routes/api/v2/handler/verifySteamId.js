const isValidSteamId = async (req, res, next) => {
  if (req.params.id.match(/[0-9]{17}/g)) {
    await next();
  } else {
    await next({
      response: {
        status: 404,
        data: "Steam id should contain 17 digit.",
      },
    });
  }
};

module.exports = isValidSteamId;
