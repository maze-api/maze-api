const router = require('express').Router();
const User = require('../models/user');
const Key = require('../models/key-model');
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

  .put('/refresh-key', ({ body }, res, next) => {
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
        return user;
      })
      .then(user => {
        const key = new Key();

        return key.save()
          .then(key => {
            return User.updateById(user.id, {
              $set: {
                key: key
              }
            })
              .then(user => res.send(user.key));
          });
      })
      .catch(next);
  })


  .delete('/', ({ body }, res, next) => {
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
        return user;
      })
      .then(user => {
        Promise.all([
          Key.findOneAndRemove(user.key),
          User.findOneAndRemove(user.id)
        ])
          .then(([key, user]) => {
            user.key = key;
            return res.send(user);
          });
      })
      .catch(next);
  })


  .use('/users', ensureRole('admin'), authUser)

; /*end of router*/


module.exports = router;