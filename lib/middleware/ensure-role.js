module.exports = function ensureRole(role) {
  return ({ user }, res, next) => {

    if(user && user.roles && user.roles.includes(role)) {
      next();
      return;
    }

    next({
      statusCode: 403,
      error: `User not authorized, must be "${role}"`
    });
  
  };
};