const request = require('../request');
const connect = require('../../lib/connect');
const MONGODB_URI = global.__MONGO_URI__;
const mongoose = require('mongoose');
const { dropCollection } = require('../db');


describe('connect.js', () => {

  it('logs when options.log equals true', () => {

    const testUser = {
      email: 'me@me.com',
      password: 'abc'
    };

    dropCollection('users');
    return connect(MONGODB_URI, { log: true })
      .then(() => {
        return request
          .post('/api/auth/signup')
          .send(testUser)
          .expect(200)
          .then(({ body }) => body);
      });
  });

  it('closes processes on SIGINT', (done) => {
    let killProcess;
    global.process.on = (sig, cb) => {
      if(sig === 'SIGINT') {
        killProcess = cb;
      }
    };
    global.process.exit = jest.fn();
    mongoose.connection.on('close', () => {
      setTimeout(() => {
        expect(global.process.exit).toHaveBeenCalledWith(0);
        done();
      }, 0);
    });
    connect(MONGODB_URI, { log: false })
      .then(() => {
        killProcess();
      });
  });
});