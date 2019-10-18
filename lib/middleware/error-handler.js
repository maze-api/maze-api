// we *must* include all four params for express 
// to know this is an error handling middleware
// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let error = 'Internal Server Error';

  // Mongoose Validation Error?
  if(err.name === 'ValidationError' || err.name === 'CastError') {
    statusCode = 400;
    error = err.message;
  }
  // is this one of our errors?
  else if(err.statusCode) {
    // by convention, we're passing in an object
    // with a statusCode property for http statusCode
    // and a error property for message to display
    statusCode = err.statusCode;
    error = err.error;
  }
  // or something unexpected?
  else {
    // log actual error
    console.log('UNEXPECTED ERROR', err);
  }

  // if you want to see all errors in log, uncomment:
  // if(process.env.NODE_ENV !== 'test') {
  //   console.log('ERROR', statusCode, error);
  // }

  res.status(statusCode).send({ error });
};