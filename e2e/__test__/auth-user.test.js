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

  let testAdminKey;
  beforeEach(() => {
    return signupUser(testAdmin).then(user => {
      testAdminKey = user.key;
      return User.updateById(user._id, {
        $addToSet: {
          roles: 'admin'
        }
      });
    });
  });

  let testUserId;
  beforeEach(() => {
    return signupUser(testUser).then(user => {
      testUserId = user._id;
    });
  });

  it('puts a role into user', () => {
    return request
      .put(`/api/auth/users/${testUserId}/roles/bottom-dweller`)
      .set('Authorization', testAdminKey)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            hash: expect.any(String),
            key: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "email": "me@me.com",
            "hash": Any<String>,
            "key": Any<String>,
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
      .set('Authorization', testAdminKey)
      .expect(200)
      .then(() => {
        return request
          .delete(`/api/auth/users/${testUserId}/roles/bottom-dweller`)
          .set('Authorization', testAdminKey)
          .expect(200)
          .then(({ body }) => {
            expect(body).toMatchInlineSnapshot(
              {
                _id: expect.any(String),
                hash: expect.any(String),
                key: expect.any(String)
              },
              `
              Object {
                "__v": 0,
                "_id": Any<String>,
                "email": "me@me.com",
                "hash": Any<String>,
                "key": Any<String>,
                "roles": Array [],
              }
            `
            );
          });
      });
  });

  it('gets all users with roles and with API key details', () => {
    return request
      .get('/api/auth/users')
      .set('Authorization', testAdminKey)
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(2);
        expect(body[0]).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            hash: expect.any(String),
            key: {
              _id: expect.any(String),
              created: expect.any(String)
            }
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "email": "admin@admin.com",
            "hash": Any<String>,
            "key": Object {
              "__v": 0,
              "_id": Any<String>,
              "active": true,
              "created": Any<String>,
            },
            "roles": Array [
              "admin",
            ],
          }
        `
        );
      });
  });

  it('deletes a user from the database', () => {
    return request
      .delete(`/api/auth/users/${testUserId}`)
      .set('Authorization', testAdminKey)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            hash: expect.any(String),
            key: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "email": "admin@admin.com",
            "hash": Any<String>,
            "key": Any<String>,
            "roles": Array [
              "admin",
            ],
          }
        `
        );
      });
  });
});
