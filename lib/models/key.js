const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  active: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: new Date()
  }
});


module.exports = mongoose.model('Key', schema);