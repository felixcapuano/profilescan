const constants = {
  id: {
    correct: "76561198069504185", //mammoth
    bad: "6561198069504185", //mammoth
  },
  name: {
    correct: "Xnem",
    bad: "Xnemqlsdjflmqjsdjf",
  },
};

const testValueList = ["getfriendlist", "getplayerachievements", "getplayersummaries", "getrecentlyplayedgames", "getuserstatsforgame"];

describe("Steam api v2", () => {
  testValueList.forEach((value) => {
    describe(`GET /api/v2/steam/${value}/:id/`, () => {
      it("Correct user id", (done) => {
        request
          .get(`/api/v2/steam/${value}/${constants.id.correct}`)
          .expect(302)
          .end((err, res) => {
            done(err);
          });
      });

      it("Correct user id cached", (done) => {
        request
          .get(`/api/v2/steam/${value}/${constants.id.correct}`)
          .expect(304)
          .end((err, res) => {
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
    });
  });
});
