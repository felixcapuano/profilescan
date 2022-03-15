const express = require("express");
const app = express();

app.use(require("./routes"));
app.get("/", (req, res) => res.send("hello world`<br>nothing much to do here"));

module.exports = app;
