const request = require('../request');
const { dropCollection } = require('../db');
const { signupUser } = require('../data-helpers');
const User = require('../../lib/models/user');
const Key = require('../../lib/models/key-model');

describe('Auth API', () => {



  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('keys'));

  const testUser = {
    email: 'me@me.com',
    password: 'abc'
  };

  let apiKey;
  beforeEach(() => {
    return signupUser()
      .then(user => {
        apiKey = user.key;
      });
  });



  testBadSignin('rejects bad password', {
    email: 'me@me.com',
    password: 'bad'
  });

  testBadSignin('rejects invalid email', {
    email: 'bad@email.com',
    password: testUser.password
  });


    
  it('signs up a user', () => {
    expect(apiKey).toBeDefined;
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


  it('signs in a user', () => {
    return request
      .post('/api/auth/signin')
      .send(testUser)
      .expect(200)
      .then(({ body }) => {
        expect(body.key).toBeDefined();
      });
  });

  it('updates key', () => {
    return request
      .put('/api/auth/refresh-key')
      .send(testUser)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body).not.toBe(apiKey);
      });
  });

  it('doesn\'t allow users without proper email to update key', () => {
    return request
      .put('/api/auth/refresh-key')
      .send({
        email: 'bad@email.com',
        password: testUser.password
      })
      .expect(401)
      .then(({ body }) => {
        expect(body.error).toBe('Invalid email or password');
      });
  });

  it('doesn\'t allow users without proper email to update key', () => {
    return request
      .put('/api/auth/refresh-key')
      .send({
        email: 'me@me.com',
        password: 'bad'
      })
      .expect(401)
      .then(({ body }) => {
        expect(body.error).toBe('Invalid email or password');
      });
  });

  it('it allows remover to delete themselves', () => {
    return request
      .delete('/api/auth')
      .send(testUser)
      .expect(200)
      .then(({ body }) => {
        expect(body.email).toBe(testUser.email);
        expect(body.key._id).toBe(apiKey);
        return body;
      })

      .then(user => {
        User.findById(user._id)
          .then(user => {
            expect(user).toBe(null);
          });
      });
  });

  it('removes user key as well as user', () => {
    return request
      .delete('/api/auth')
      .send(testUser)
      .expect(200)
      .then(({ body }) => {
        expect(body.email).toBe(testUser.email);
        expect(body.key._id).toBe(apiKey);
        return body;
      })

      .then(user => {
        Key.findById(user.key._id)
          .then(key => {
            expect(key).toBe(null);
          });
      });
  });

  it('doesn\'t allow users without proper email to delete themselves', () => {
    return request
      .delete('/api/auth')
      .send({
        email: 'bad@email.com',
        password: testUser.password
      })
      .expect(401)
      .then(({ body }) => {
        expect(body.error).toBe('Invalid email or password');
      });
  });

  it('doesn\'t allow users without proper email to delete themselves', () => {
    return request
      .delete('/api/auth')
      .send({
        email: 'me@me.com',
        password: 'bad'
      })
      .expect(401)
      .then(({ body }) => {
        expect(body.error).toBe('Invalid email or password');
      });
  });


  testEmailAndPasswordRequired('signup', 'email', { password: 'I no like emails' });
  testEmailAndPasswordRequired('signup', 'password', { email: 'no@password.com' });

  testEmailAndPasswordRequired('signin', 'email', { password: 'I no like emails' });
  testEmailAndPasswordRequired('signin', 'password', { email: 'no@password.com' });




  function testBadSignin(testName, user) {
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


});