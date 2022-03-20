const error = (err, req, res, next) => {
  console.error(err)
  res.status(500).send('Something broke!')
}

module.exports = error;