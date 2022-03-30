const response = async (req, res) => {
  console.log(`GET ${req.originalUrl}${req.cached ? ' "use cache"' : ""}`);

  await res.contentType("application/json");

  // if (req.cached) {
  //   await res.status(200);
  //   req.data.cached = true;
  // } else
  if (req.data) {
    await res.status(200);
    req.data.cached = false;
  } else {
    await res.status(404);
  }
  await res.send(req.data);
};

module.exports = response;
