const error = async (err, req, res, next) => {
  // console.log(err)
  res.sendStatus(err.status);
};

module.exports = error;
