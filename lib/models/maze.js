const mongoose = require('mongoose');
const { Schema } = mongoose;

const mazeSchema = new Schema({
  topologyName: {
    type: String,
    enum: ['Rectangle']
  },
  algorithm: {
    type: String,
    enum: ['Recursive Back Tracker']
  },
  dimensions: {
    height: Number,
    width: Number
  },
  difficulty: {
    type: String,
    enum: ['Easier', 'Average', 'Harder']
  },
  connectivity: Number,
  averagePathLength: Number,
  solutionLength: Number,
  cellStructureKey: {
    coordinates: {
      x: String,
      y: String
    },
    exits: String,
  },
  start: {
    x: Number,
    y: Number
  },
  end: {
    x: Number,
    y: Number
  },
  solutionPath: [{
    x: Number,
    y: Number
  }],
  cellMap: [[{
    coordinates: { 
      x: Number,
      y: Number
    },
    exits: [{
      x: Number,
      y: Number
    }]
  }]]
});

module.exports = mongoose.model('Maze', mazeSchema, 'mazes');
