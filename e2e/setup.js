const connect = require('../lib/connect');
const MONGODB_URI = global.__MONGO_URI__;
// const MONGODB_URI = 'mongodb://localhost:27017/famous-cats-test';
const mongoose = require('mongoose');

beforeAll(() => {
  return connect(MONGODB_URI, { log: false });
});

afterAll(() => {
  return mongoose.connection.close();
});
