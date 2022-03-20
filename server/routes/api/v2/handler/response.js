const response = async (req, res) => {

  console.log(`GET ${req.originalUrl}${req.cached ? " use cache" : ""}`);

  await res
    .contentType("application/json")
    .send(req.data);
}

module.exports = response;