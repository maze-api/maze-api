const request = require('../request');

describe('Core App', () => {
  it('is alive', () => {
    return request
      .get('/hello')
      .expect(200)
      .then(res => {
        expect(res.text).toBe('world');
      });
  });

  it('returns 404 on non-api bad path', () => {
    return request
      .get('/bad-path')
      .expect(404)
      .expect('Content-Type', /text/);
  });

  it('returns application/json 404 on bad api path', () => {
    return request
      .post('/api/bad-path')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.error).toMatch(/not found/i);
      });
  });
});