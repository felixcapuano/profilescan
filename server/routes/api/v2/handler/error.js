const error = async (err, req, res, next) => {
  // console.error(err.response)
  res.sendStatus(err.response.status)
}

module.exports = error;