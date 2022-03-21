const supertest = require("supertest");
const app = require("../server/entrypoint");

global.request = supertest(app);

beforeEach(() => {
  // console.log = (msg) => {
  //   output = "";
  //   console.log = (msg) => {
  //     output += msg + "\n";
  //   };
  // };
});
