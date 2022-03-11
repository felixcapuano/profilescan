describe('GET /id/:userId', async () => {
  it('Correct user id', (done) => {
    request
      .get('/id/frate2b')
      .expect(302)
      .end((err, res) => {
        done(err);
      });
  });

  it('Bad user id', (done) => {
    request
      .get('/id/kjdlkfjqlskjdflkqdsjlkfjsq')
      .expect(404)
      .end((err, res) => {
        done(err);
      });
  });
});
