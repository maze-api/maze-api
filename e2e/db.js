const mongoose = require('mongoose');

module.exports = {   
  dropCollection(name) {
    return mongoose.connection.dropCollection(name)
      .catch(err => {
        if(err.codeName !== 'NamespaceNotFound') throw err;
      });
  }
};