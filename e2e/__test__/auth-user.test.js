const request = require('../request');
const { dropCollection } = require('../db');
const { signupUser } = require('../data-helpers');
const User = require('../../lib/models/user');

describe('Auth-User API', () => {
  
  const testUser = {
    email: 'me@me.com',
    password: 'abc'
  };
  
  const testAdmin = {
    email: 'admin@admin.com',
    password: 'abc'
  };
  
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('keys'));
  
  let testUserId;

  beforeEach(() => {
    return signupUser(testAdmin)
      .then(user => {        
        return User.updateById(user._id, {
          $addToSet: {
            roles: 'admin'
          }
        });
      })
      .then(() => {
        return request
          .post('/api/auth/signin')
          .send(testAdmin)
          .expect(200);
      });
  });

  beforeEach(() => {
    return signupUser(testUser).then(user => {
      testUserId = user._id;
    });
  });

  it('puts a role into user', () => {
    return request
      .put(`/api/auth/users/${testUserId}/roles/bottom-dweller`)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            hash: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "email": "me@me.com",
            "favorites": Array [],
            "hash": Any<String>,
            "roles": Array [
              "bottom-dweller",
            ],
          }
        `
        );
      });
  });

  it('deletes a user role', () => {
    return request
      .put(`/api/auth/users/${testUserId}/roles/bottom-dweller`)
      .expect(200)
      .then(() => {
        return request
          .delete(`/api/auth/users/${testUserId}/roles/bottom-dweller`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toMatchInlineSnapshot(
              {
                _id: expect.any(String),
                hash: expect.any(String)
              },
              `
              Object {
                "__v": 0,
                "_id": Any<String>,
                "email": "me@me.com",
                "favorites": Array [],
                "hash": Any<String>,
                "roles": Array [],
              }
            `
            );
          });
      });
  });

  it('gets all users and returns email and roles', () => {
    return request
      .get('/api/auth/users')
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String)
          },
          `
          Object {
            "_id": Any<String>,
            "email": "admin@admin.com",
            "roles": Array [
              "admin",
            ],
          }
        `
        );
      });
  });
});
