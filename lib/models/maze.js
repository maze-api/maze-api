const mongoose = require('mongoose');
const { Schema } = mongoose;
const { topology } = require('./required-types');

const mazeSchema = new Schema({
  topologyName: {
    type: String,
    enum: ['Cartesian'],
    required: true
  },
  algorithm: {
    type: String,
    enum: ['Growing Tree'],
    required: true
  },
  dimensions: topology['Cartesian'].dimensions,
  difficulty: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Maze', mazeSchema, 'mazes');

// graph: {
//   type: {
//   },
//   required: true
// },
