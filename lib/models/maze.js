const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber, RequiredBoolean } = require('./required-types');

const mazeSchema = new Schema({
  topologyName: {
    ...RequiredString,
    enum: ['Rectangular', 'Triangular', 'Hexagonal']
  },
  algorithm: {
    ...RequiredString,
    enum: ['Recursive Back Tracker']
  },
  dimensions: {
    height: RequiredNumber,
    width: RequiredNumber
  },
  difficulty: {
    ...RequiredString,
    enum: ['Easier', 'Average', 'Harder']
  },
  connectivity: RequiredNumber,
  averagePathLength: RequiredNumber,
  solutionLength: RequiredNumber,
  start: {
    x: RequiredNumber,
    y: RequiredNumber
  },
  end: {
    x: RequiredNumber,
    y: RequiredNumber
  },
  solutionPath: [{
    x: RequiredNumber,
    y: RequiredNumber
  }],
  cellMap: [[{
    coordinates: { 
      x: RequiredNumber,
      y: RequiredNumber
    },
    exits: Object,
    overpass: RequiredBoolean
  }]]
});

module.exports = mongoose.model('Maze', mazeSchema, 'mazes');
