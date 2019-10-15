/* eslint-disable  no-console */
const mongoose = require('mongoose');
const redactURLAuth = require('./redactURLAuth');

const log = (event, dbUrl) => {
  return () => {
    console.log(`${event.toUpperCase()}: connection to ${dbUrl}`);
  };
};


module.exports = (dbUrl, options = {}) => {
  
  if(options.log !== false) {
    const redactedUrl = redactURLAuth(dbUrl);
  
    mongoose.connection.on('error', log('error', redactedUrl));
    mongoose.connection.on('open', log('open', redactedUrl));
    mongoose.connection.on('close', log('close', redactedUrl));
  }

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  return mongoose.connect(dbUrl, { 
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

};