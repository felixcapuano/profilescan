const response = async (req, res) => {
  console.log(
    `GET ${req.originalUrl}${req.data.cacheTime ? ' "use cache"' : ""}`
  );

  await res
    .contentType("application/json")
    .status(req.data ? 200 : 404)
    .send(req.data);
};

module.exports = response;
