const constants = {
  id: {
    correct: "76561198069504185", //mammoth
    bad: "6561198069504185", //mammoth
    private: "76561197964163827", //Kenshirio
  },
};
const testValueList = ["players"];

describe("Faceit api v2", () => {
  testValueList.forEach((value) => {
    describe(`GET /api/v2/faceit/${value}/:id/`, () => {
      it("Correct user id", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.id.correct}`)
          .expect(200)
          .end((err, res) => {
            done(err);
          });
      });

      it("Correct user id cached", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.id.correct}`)
          .expect(200)
          .end((err, res) => {
            done(err);
          });
      });

      it("Bad user id", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.id.bad}`)
          .expect(404)
          .end((err, res) => {
            done(err);
          });
      });

      it("Private user id", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.id.private}`)
          .expect(404)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});
