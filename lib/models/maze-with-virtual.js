import { RequiredNumber } from './required-types';
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('./required-types');

const mazeSchema = new Schema({
  topologyName: {
    type: String,
    enum: ['Cartesian'],
    required: true
  },
  graph: {
    type: {

    },
    required: true
  },
  algorithm: {
    type: String,
    enum: ['Growing Tree'],
    required: true
  },
  dimensions: this.topology[this.topologyName].dimensions,

});

mazeSchema.virtual('topology').set(function(name) {
  const topology = {
    'Cartesian': {
      dimensions: {
        height: RequiredNumber,
        length: RequiredNumber
      },

    },
    'RightTriangle': {
      dimensions: {
        base: RequiredNumber,
        height: RequiredNumber
      },
    }
  };
  this.dimensions = topology[name].dimensions;
});

module.exports = mongoose.model('Maze', mazeSchema, 'mazes');
