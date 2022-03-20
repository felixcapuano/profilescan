const error = async (err, req, res, next) => {
  console.error(err.response)
  res.status(500).send('Something broke!')
}

module.exports = error;