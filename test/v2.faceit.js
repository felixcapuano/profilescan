
const constants = {
  steamId: {
    correct: "76561198069504185", //mammoth
    bad: "6561198069504185", //mammoth
    private: "76561197964163827", //Kenshirio
  },
  faceitId: {
    correct: "87307577-6381-40a5-a7c2-97ba3ec94d55", //mammoth
    bad: "87307577-6381-40a5-a7c2-97ba3ec94d5", //mammoth
    // private: "76561197964163827", //Kenshirio
  },
};
const testValueList1 = ["players"];
const testValueList2 = ["stats", "history"];

describe("Faceit api v2", () => {
  testValueList1.forEach((value) => {
    describe(`GET /api/v2/faceit/${value}/:steamId/`, () => {
      it("Correct user id", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.steamId.correct}`)
          .expect(200)
          .end((err, res) => {
            res.body.should.not.have.any.keys('cacheTime')
            done(err);
          });
      });

      it("Correct user id cached", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.steamId.correct}`)
          .expect(200)
          .end((err, res) => {
            res.body.should.have.any.keys('cacheTime')
            done(err);
          });
      });

      it("Bad user id", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.steamId.bad}`)
          .expect(404)
          .end((err, res) => {
            done(err);
          });
      });

      it("Private user id", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.steamId.private}`)
          .expect(404)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });

  describe(`GET /api/v2/faceit/stats/:faceitId/`, () => {
    testValueList2.forEach((value) => {
      it("Correct user id", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.faceitId.correct}`)
          .expect(200)
          .end((err, res) => {
            res.body.should.not.have.any.keys('cacheTime')
            done(err);
          });
      });

      it("Correct user id cached", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.faceitId.correct}`)
          .expect(200)
          .end((err, res) => {
            res.body.should.have.any.keys('cacheTime')
            done(err);
          });
      });

      it("Bad user id", (done) => {
        request
          .get(`/api/v2/faceit/${value}/${constants.faceitId.bad}`)
          .expect(404)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});
