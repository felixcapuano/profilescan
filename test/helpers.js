const supertest = require("supertest");
const app = require("../src/server");

global.request = supertest(app);
