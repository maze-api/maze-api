const mongoose = require('mongoose');
const { Schema } = mongoose;
const { topology } = require('./required-types');
const { dimensions, cellStructure } = topology['Rectangle'];
const { coordinates } = cellStructure;
const { coordOne, coordTwo } = coordinates;
const { height, width } = dimensions;

const mazeSchema = new Schema({
  topologyName: {
    type: String,
    enum: ['Rectangle'],
    required: true
  },
  algorithm: {
    type: String,
    enum: ['Growing Tree'],
    required: true
  },
  dimensions: {
    height: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: false
  },
  cellStructure: {
    coordinates: {
      coordOne: 'x',
      coordTwo: 'y'
    },
    sides: 4
  }
},

  end: {
    type: Object,
    required: false,
    default: {

    }
  }
  });

module.exports = mongoose.model('Maze', mazeSchema, 'mazes');

// graph: {
//   type: {
//   },
//   required: true
// },
