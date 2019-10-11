const request = require('../request');
const { dropCollection } = require('../db');
const { signupUser } = require('../data-helpers');
const jwt = require('jsonwebtoken');

describe('Auth API', () => {
  beforeEach(() => dropCollection('users'));

  const testUser = {
    email: 'me@me.com',
    password: 'abc'
  };

  let token;
  
  
  beforeEach(() => {
    return signupUser()
      .then(user => {
        token = user.token;
      });
  });


  it('verifies a good token', () => {
    return request
      .get('/api/auth/verify')
      .set('Authorization', token)
      .expect(200);
  });

  it('verifies a bad token', () => {
    return request
      .get('/api/auth/verify')
      .set('Authorization', jwt.sign({ foo: 'bar' }, 'shhh'))
      .expect(401);
  });


  it('signs up a user', () => {
    expect(token).toBeDefined;
  });



  function testBadSignup(testName, user) {
    it(testName, () => {
      return request
        .post('/api/auth/signin')
        .send(user)
        .expect(401)
        .then(({ body }) => {
          expect(body.error).toBe('Invalid email or password');
        });
    });
  }


  testBadSignup('rejects bad password', {
    email: 'me@me.com',
    password: 'bad'
  });

  testBadSignup('rejects invalid email', {
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
        expect(body.error).toBe('Email already in use');
      });
  });


  
  it('signs in a user', () => {
    return request
      .post('/api/auth/signin')
      .send(testUser)
      .expect(200)
      .then(({ body }) => {
        expect(body.token).toBeDefined();
      });
  });

  function testEmailAndPasswordRequired(route, testProperty, user) {
    it(`${route} requires ${testProperty}`, () => {
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