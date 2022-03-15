const supertest = require("supertest");
const app = require("../server/server");

global.request = supertest(app);
