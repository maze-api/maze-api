const request = require('./request');

const testUser = {
  email: 'me@me.com',
  password: 'abc'
};

function signupUser(user = testUser) {
  return request
    .post('/api/auth/signup')
    .send(user)
    .expect(200)
    .then(({ body }) => body);
}

module.exports = {
  signupUser
};

