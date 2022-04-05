const constants = {
  id: {
    correct: "76561198069504185", //mammoth
    bad: "6561198069504185", //mammoth
    private: "76561197964163827", //Kenshirio
  },
  name: {
    correct: "Xnem",
    bad: "Xnemqlsdjflmqjsdjf",
  },
};

const testValueList = [
  "getfriendlist",
  "getplayerachievements",
  // "getplayersummaries",
  "getrecentlyplayedgames",
  "getuserstatsforgame",
];

describe("Steam api v2", () => {
  testValueList.forEach((value) => {
    describe(`GET /api/v2/steam/${value}/:id/`, () => {
      it("Correct user id", (done) => {
        request
          .get(`/api/v2/steam/${value}/${constants.id.correct}`)
          .expect(200)
          .end((err, res) => {
            res.body.should.not.have.any.keys('cacheTime')
            done(err);
          });
      });

      it("Correct user id cached", (done) => {
        request
          .get(`/api/v2/steam/${value}/${constants.id.correct}`)
          .expect(200)
          .end((err, res) => {
            res.body.should.have.any.keys('cacheTime')
            done(err);
          });
      });

      it("Bad user id", (done) => {
        request
          .get(`/api/v2/steam/${value}/${constants.id.bad}`)
          .expect(404)
          .end((err, res) => {
            done(err);
          });
      });

      it("Private user id", (done) => {
        request
          .get(`/api/v2/steam/${value}/${constants.id.private}`)
          .expect(404)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });

  describe(`GET /api/v2/steam/getcommunityprofile/`, () => {
    it("Correct user id", (done) => {
      request
        .get(
          `/api/v2/steam/getcommunityprofile/?path=/profiles/${constants.id.correct}`
        )
        .expect(200)
        .end((err, res) => {
          done(err);
        });
    });

    it("Bad user id", (done) => {
      request
        .get(
          `/api/v2/steam/getcommunityprofile/?path=/profiles/${constants.id.bad}`
        )
        .expect(404)
        .end((err, res) => {
          done(err);
        });
    });

    it("Private user id", (done) => {
      request
        .get(
          `/api/v2/steam/getcommunityprofile/?path=/profiles/${constants.id.private}`
        )
        .expect(200)
        .end((err, res) => {
          done(err);
        });
    });

    it("Correct user name", (done) => {
      request
        .get(
          `/api/v2/steam/getcommunityprofile/?path=/id/${constants.name.correct}`
        )
        .expect(200)
        .end((err, res) => {
          done(err);
        });
    });

    it("Bad user id", (done) => {
      request
        .get(
          `/api/v2/steam/getcommunityprofile/?path=/profiles/${constants.name.bad}`
        )
        .expect(404)
        .end((err, res) => {
          done(err);
        });
    });
  });
});
