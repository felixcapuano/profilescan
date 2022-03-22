require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

// console.log(PORT);
// console.log(SERVER_PORT);
// console.log(STEAM_API_KEY);
// console.log(FACEIT_API_KEY);
console.log(process.env.REDIS_HOST);
console.log(process.env.REDIS_PORT);
console.log(process.env.REDIS_USERNAME);
// console.log(REDIS_PASSWORD);
console.log(process.env.REDIS_DATABASE);

if (process.env.NODE_ENV === "development") {
  const cors = require("cors");
  app.use(cors());
}

app.use(require("./routes"));

if (process.env.NODE_ENV !== "development") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

if (process.env.NODE_ENV !== "test") {
  const port = process.env.SERVER_PORT || 80;
  app.listen(port, () => console.log(`listening on port ${port}`));
}

module.exports = app;
