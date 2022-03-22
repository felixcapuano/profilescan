const error = async (err, req, res, next) => {
  res.sendStatus(err.status)
}

module.exports = error;