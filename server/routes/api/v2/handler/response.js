const response = async (req, res) => {

  console.log(`GET ${req.originalUrl}${req.cached ? " use cache" : ""}`);

  res.contentType("application/json");

  if (req.cached) {
    await res.status(304);
  } else if (req.data) {
    await res.status(302);
  } else {
    await res.status(404);
  }
  await res.send(req.data);
}

module.exports = response;