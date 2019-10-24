const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  // better to have the user ref from the key
  // a user can have many keys
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });


module.exports = mongoose.model('Key', schema);
