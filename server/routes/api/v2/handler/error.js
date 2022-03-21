const error = async (err, req, res, next) => {
  // console.error(err.response)
  res.sendStatus(500)
}

module.exports = error;