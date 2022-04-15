const error = async (err, req, res, next) => {
  // console.log(err)
  res.sendStatus(500);
};

module.exports = error;
