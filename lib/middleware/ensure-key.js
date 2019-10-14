const User = require('../models/user');

module.exports = () => (req, res, next) => {
  const key = req.get('Authorization');
  
  if(!key) {
    next({
      statusCode: 401,
      error: 'No Key Found'
    });
    return;
  }

  User.findOne({ key })
    .then(payload => {
      req.user = payload;
      next();
    })
    .catch(() => {
      next({
        statusCode: 401,
        error: 'Invalid Token'
      });
    });
};