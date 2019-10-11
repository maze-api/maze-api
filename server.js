// loads the .env environment variables
require('dotenv').config();
// connect to mongo
require('./lib/connect')(process.env.MONGODB_URI);

// require the app http event handler
const app = require('./lib/app');
// create an http server that uses app
const { createServer } = require('http');
const server = createServer(app);

// start the server by listening on a port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});