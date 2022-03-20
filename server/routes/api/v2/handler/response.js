const response = async (req, res) => {

  console.log(`GET ${req.originalUrl}`);

  await res
    .contentType("application/json")
    .send(req.data);
}

module.exports = response;