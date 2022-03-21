const { createClient } = require("redis");

let connected = false;

const client = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  // socket: {
  //   host: process.env.REDIS_HOST,
  //   port: process.env.REDIS_PORT,
  // },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  database: process.env.REDIS_DATABASE,
});

client
  .connect()
  .then(() => {
    console.log("Redis Client Connected");
    connected = true;
  })
  .catch((err) => {
    console.error(`Fail to connect with Redis : ${err}`);
  });

module.exports = client;
