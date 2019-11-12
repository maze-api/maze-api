const express = require('express');
const app = express();
const cors = require('cors');
// Load model plugins
require('./models/register-plugins');

// MIDDLEWARE
const morgan = require('morgan');
const checkConnection = require('./middleware/check-connection');

app.use(morgan('dev', { skip: () => process.env.NODE_ENV === 'test' }));

app.use(cors());
app.use(express.json());
app.use(checkConnection());

// IS ALIVE TEST
app.get('/hello', (req, res) => res.send('world'));

// API ROUTES
const auth = require('./routes/auth');
const mazes = require('./routes/maze-routes');
app.use('/api/auth', auth);
app.use('/api/mazes', mazes);

// NOT FOUND
const api404 = require('./middleware/api-404');
app.use('/api', api404);
// using express default 404 for non-api routes

// ERRORS
const errorHandler = require('./middleware/error-handler');
app.use(errorHandler);

module.exports = app;