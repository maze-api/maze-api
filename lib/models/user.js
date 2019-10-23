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
  roles: [String]
}, {
  toJSON: {
    // auto transform when sending express responses
    transform(doc, ret) {
      delete ret.hash;
      delete roles;
      delete ret._id;
      delete ret.__v;
    }
  }
});

schema.virtual('password').set(function (password) {
  this.hash = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function (password) {
  return bcrypt.compareSync(password, this.hash);
});

module.exports = mongoose.model('User', schema);
