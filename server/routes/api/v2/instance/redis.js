const { createClient } = require("redis");

console.log(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
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

const isRedisAwake = async () => {
  try {
    const ping = await client.ping();
    return ping === "PONG";
  } catch (error) {
    return false;
  }
};

let ready = false;
client.on("ready", () => (ready = true));
const isRedisReady = () => ready;

let connected = false;
client.on("connect", () => (connected = true));
const isRedisConnected = () => connected;
// client
//   .connect()
//   .then(() => {
//     console.log("Redis Client Connected");
//   })
//   .catch((err) => {
//     console.error(`Fail to connect with Redis : ${err}`);
//   });

module.exports = { client, isRedisAwake, isRedisReady, isRedisConnected };
