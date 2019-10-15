const mongoose = require('mongoose');
const request = require('../request');


const testUser = {
  email: 'me@me.com',
  password: 'abc'
};

function signupUser(user = testUser) {
  return request
    .post('/api/auth/signup')
    .send(user)
    .expect(500)
    .then(({ body }) => body);
}


describe('db', () => {
  it('if database is not connected, it will throw a 500 error', () => {
    return mongoose.connection.close()
      .then(() => {
        return signupUser()
          .then(({ error }) => {
            expect(error).toBe('database not available');
          });

      });
  });
});