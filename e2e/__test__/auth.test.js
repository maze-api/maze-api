const request = require('../request');
const { dropCollection } = require('../db');
const { signupUser } = require('../data-helpers');

describe('Auth API', () => {
  beforeEach(() => dropCollection('users'));

  const testUser = {
    email: 'me@me.com',
    password: 'abc'
  };

  let api_key;
  beforeEach(() => {
    return signupUser()
      .then(user => {
        
        api_key = user.api_key;
        console.log(api_key);
      });
  });


  // it('verifies a good token', () => {
  //   return request
  //     .get('/api/auth/verify')
  //     .set('Authorization', token)
  //     .expect(200);
  // });

  // it('verifies a bad token', () => {
  //   return request
  //     .get('/api/auth/verify')
  //     .set('Authorization', jwt.sign({ foo: 'bar' }, 'shhh'))
  //     .expect(401);
  // });


  it('signs up a user', () => {
    expect(api_key).toBeDefined;
  });



  function testBadSignin(testName, user) {
    it.skip(testName, () => {
      return request
        .post('/api/auth/signin')
        .send(user)
        .expect(401)
        .then(({ body }) => {
          expect(body.error).toBe('Invalid email or password');
        });
    });
  }


  testBadSignin('rejects bad password', {
    email: 'me@me.com',
    password: 'bad'
  });

  testBadSignin('rejects invalid email', {
    email: 'bad@email.com',
    password: testUser.password
  });


  it('cannot signup with same email', () => {
    return request
      .post('/api/auth/signup')
      .send({
        email: 'me@me.com',
        password: 'abc'
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.error).toBe('Email already in use, please use PUT api/users/refreshKey to get a new key');
      });
  });


  it.skip('signs in a user', () => {
    return request
      .post('/api/auth/signin')
      .send(testUser)
      .expect(200)
      .then(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });

  function testEmailAndPasswordRequired(route, testProperty, user) {
    it.skip(`${route} requires ${testProperty}`, () => {
      return request
        .post(`/api/auth/${route}`)
        .send(user)
        .expect(400)
        .then(({ body }) => {
          expect(body.error).toBe('Email and password required');
        });
    });
  }

  testEmailAndPasswordRequired('signup', 'email', { password: 'I no like emails' });
  testEmailAndPasswordRequired('signup', 'password', { email: 'no@password.com' });

  testEmailAndPasswordRequired('signin', 'email', { password: 'I no like emails' });
  testEmailAndPasswordRequired('signin', 'password', { email: 'no@password.com' });


});