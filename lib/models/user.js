const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const { ObjectId } = Schema.Types;


const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  roles: [String],
  key: {
    type: ObjectId,
    ref: 'Key',
    required : true
  }
});

schema.virtual('password').set(function(password) {
  this.hash = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function(password) {
  return bcrypt.compareSync(password, this.hash);
});

schema.static('addRole', function(userId, role) {
  return this.updateById(userId, { 
    $addToSet: { 
      roles: role
    }
  });
});

schema.static('removeRole', function(userId, role) {
  return this.updateById(userId, { 
    $pull: { 
      roles: role
    }
  });
});

module.exports = mongoose.model('User', schema);