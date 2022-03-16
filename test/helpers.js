const supertest = require("supertest");
const app = require("../server/entrypoint");

global.request = supertest(app);
