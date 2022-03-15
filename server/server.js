const express = require("express");
const path = require("path");
const app = express();

if (true) {
  const cors = require("cors");
  app.use(cors());
}

app.use(require("./routes"));
app.use(express.static(path.join(__dirname, "../build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

module.exports = app;
