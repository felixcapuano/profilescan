const logger = require("../../../../logging");

const error = async (err, req, res, next) => {
  // console.log(err)
  res.sendStatus(err.status || 500);
};

module.exports = error;
