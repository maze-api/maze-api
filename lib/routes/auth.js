const router = require('express').Router();
const User = require('../models/user');
const Key = require('../models/key-model');
const ensureAuth = require('../middleware/ensure-auth');
const ensureRole = require('../middleware/ensure-role');
const authUser = require('./auth-users');

const checkCredentialsExist = (email, password) => {
  if(!email || !password) {
    return Promise.reject({
      statusCode: 400,
      error: 'Email and password required'
    });
  }
  return Promise.resolve();
};


router

  // .get('/verify', ensureAuth(), (req, res) => {
  //   res.json({ verified: true });
  // })

  .post('/signup', ({ body }, res, next) => {
    const { email, password } = body;

    checkCredentialsExist(email, password)
      .then(() => {
        return User.exists({ email });
      })
      .then(exists => {
        if(exists) {
          throw {
            statusCode: 400,
            error: 'Email already in use, please use PUT api/users/refreshKey to get a new key'
          };
        }
        const key = new Key();
        return key.save()
          .then(key => {
            body.key = key._id;
            body.roles = [];
            const user = new User(body);
            return user.save();
          });
      })
      .then(user => res.json(user))
      .catch(next);

  })

  .post('/signin', ({ body }, res, next) => {
    const { email, password } = body;

    checkCredentialsExist(email, password)
      .then(() => {
        return User.findOne({ email });
      })
      .then(user => {
        if(!user || !user.comparePassword(password)) {
          throw {
            statusCode: 401,
            error: 'Invalid email or password'
          };
        }
        user = {
          email: user.email,
          key: user.key
        };
        return res.json(user);
      })
      .catch(next);
  })

  // .use('/users', ensureAuth(), ensureRole('admin'), authUser)

; /*end of router*/


module.exports = router;