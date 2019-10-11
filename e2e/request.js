const app = require('../lib/app');
const request = require('supertest');

module.exports = request(app);