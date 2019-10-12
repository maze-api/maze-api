const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredBoolean, RequiredDate } = require('./required-types');

const schema = new Schema({
  active: RequiredBoolean,
  created: RequiredDate
});


module.exports = mongoose.model('Key', schema);