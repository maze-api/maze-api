const express = require('express');
const app = express();
// Load model plugins
require('./models/register-plugins');
const ensureKey = require('../lib/middleware/ensure-key');

// MIDDLEWARE
const morgan = require('morgan');
//const ensureAuth = require('./middleware/ensure-auth');
const checkConnection = require('./middleware/check-connection');

app.use(morgan('dev'));
app.use(express.json());
app.use(checkConnection());

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
const auth = require('./routes/auth');
const mazes = require('./routes/maze-routes');
app.use('/api/auth', auth);
app.use('/api/mazes', ensureKey(), mazes);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;