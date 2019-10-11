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
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  cellStructureKey: {
    coordinates: {
      x: String,
      y: String
    },
    sides: String,
  },
  start: {
    x: Number,
    y: Number
  },
  end: {
    x: Number,
    y: Number
  },
  solution: [{
    x: Number,
    y: Number
  }],
  graph: [[{
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
