const connect = require('../lib/connect');
const MONGODB_URI = global.__MONGO_URI__;
const mongoose = require('mongoose');

beforeAll(() => {
  return connect(MONGODB_URI, { log: false });
});

afterAll(() => {
  return mongoose.connection.close();
});
