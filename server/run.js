require("dotenv").config();
const server = require("./server");

console.log(process.env.NODE_ENV)
const port = process.env.SERVER_PORT || 3000;

server.listen(port, () => console.log(`listening on port ${port}`));
