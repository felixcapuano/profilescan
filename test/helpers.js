const supertest = require("supertest");
const app = require("../server/entrypoint");
const { client } = require("../server/routes/api/v2/instance/redis");

global.request = supertest(app);

before(async () => {
  try {
    await client.connect();
    await client.flushAll();
  } catch (error) {
    throw error;
  }
});

beforeEach(async () => {
  console.log = (msg) => {
    output = "";
    console.log = (msg) => {
      output += msg + "\n";
    };
  };
});

after(async () => {
  try {
    await client.disconnect();
  } catch (error) {
    throw error;
  }
});
