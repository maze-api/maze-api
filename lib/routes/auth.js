const router = require('express').Router();
const User = require('../models/user');
const Key = require('../models/key');
const ensureKey = require('../middleware/ensure-key');
const ensureRole = require('../middleware/ensure-role');
const authUser = require('./auth-users');

const checkCredentialsExist = (email, password) => {
  if (!email || !password) {
    return Promise.reject({
      statusCode: 400,
      error: 'Email and password required'
    });
  }
  return Promise.resolve();
};


router

  .post('/signup', ({ body }, res, next) => {
    const { email, password } = body;

    checkCredentialsExist(email, password)
      .then(() => {
        return User.exists({ email });
      })
      .then(exists => {
        if (exists) {
          throw {
            statusCode: 400,
            error: 'Email already in use, please use PUT api/users/refreshKey to get a new key'
          };
        }
        return User.create(body)
      })
      .then(user => Promise.all([user, Key.create({ user })]))
      .then(([user]) => res.json(user))
      .catch(next);

  })

  .post('/signin', ({ body }, res, next) => {
    const { email, password } = body;

    checkCredentialsExist(email, password)
      .then(() => User.findOne({ email }))
      .then(user => {
        if (!user || !user.comparePassword(password)) {
          throw {
            statusCode: 401,
            error: 'Invalid email or password'
          };
        }

        // will use the toJSON transformer from the model
        return res.json(user);
      })
      .catch(next);
  })

  .put('/refresh-key', ({ body }, res, next) => {
    const { email, password } = body;

    checkCredentialsExist(email, password)
      .then(() => User.findOne({ email }))
      .then(user => {
        if (!user || !user.comparePassword(password)) {
          throw {
            statusCode: 401,
            error: 'Invalid email or password'
          };
        }
        return user;
      })
      .then(user => {
        return Key.create({ user })
      })
      .then(key => res.send(key))
      .catch(next);
  })


  .delete('/', ({ body }, res, next) => {
    const { email, password } = body;

    checkCredentialsExist(email, password)
      .then(() => {
        return User.findOne({ email });
      })
      .then(user => {

        if (!user || !user.comparePassword(password)) {
          throw {
            statusCode: 401,
            error: 'Invalid email or password'
          };
        }
        return user;
      })
      .then(user => {
        Promise.all([
          Key.findOneAndUpdate({ user: user.id }, { active: false }),
          User.findOneAndRemove(user.id)
        ])
          .then(([key, user]) => {
            return res.send(user);
          });
      })
      .catch(next);
  })


  .use('/users', ensureKey(), ensureRole('admin'), authUser)

  ; /*end of router*/


module.exports = router;
