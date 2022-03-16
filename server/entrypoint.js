require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  const cors = require("cors");
  app.use(cors());
}

app.use(require("./routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

if (process.env.NODE_ENV !== "test") {
  const port = process.env.SERVER_PORT || 3000;

  app.listen(port, () => console.log(`listening on port ${port}`));
}

module.exports = app;
