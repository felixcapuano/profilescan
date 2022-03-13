describe('GET /id/:userId', async () => {
  it('Correct user id', (done) => {
    request
      .get('/id/frate2b')
      .expect(302)
      .end((err, res) => {
        done(err);
      });
  });

  it('Correct user id (with backslash)', (done) => {
    request
      .get('/id/azidot/')
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
  it('Bad user id (with backslash)', (done) => {
    request
      .get('/id/qksjdhfkjheokjfqlk/')
      .expect(404)
      .end((err, res) => {
        done(err);
      });
  });
});

describe('GET /profiles/:userId', async () => {
  it('Correct user id', (done) => {
    request
      .get('/profiles/76561198069504185')
      .expect(302)
      .end((err, res) => {
        done(err);
      });
  });
});