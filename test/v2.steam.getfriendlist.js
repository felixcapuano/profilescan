describe("GET /api/v2/steam/getfriendlist/:id/", () => {
  const value = {
    id: {
      correct: "76561198069504185", //mammoth
      bad: "6561198069504185", //mammoth
    },
    name: {
      correct: "Xnem",
      bad: "Xnemqlsdjflmqjsdjf",
    },
  };

  it("Correct user id", (done) => {
    request
      .get(`/api/v2/steam/getfriendlist/${value.id.correct}`)
      .expect(302)
      .end((err, res) => {
        done(err);
      });
  });

  it("Correct user id cached", (done) => {
    request
      .get(`/api/v2/steam/getfriendlist/${value.id.correct}`)
      .expect(304)
      .end((err, res) => {
        done(err);
      });
  });

  it("Bad user id", (done) => {
    request
      .get(`/api/v2/steam/getfriendlist/${value.id.bad}`)
      .expect(404)
      .end((err, res) => {
        done(err);
      });
  });
});
