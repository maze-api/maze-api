const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');
const HexMaze = require('../algorithms/hexagonalRecursiveBacktracker/Maze');

const schema = new Schema({
  topologyName: {
    ...RequiredString,
    enum: ['Rectangular', 'Triangular', 'Hexagonal'],
    default: 'Hexagonal'
  },
  algorithm: {
    ...RequiredString,
    enum: ['Recursive Back Tracker'],
    default: 'Recursive Back Tracker'
  },
  dimensions: {
    height: {
      ...RequiredNumber,
      default: 10
    },
    width: {
      ...RequiredNumber,
      default: 10
    }
  },
  difficulty: {
    type: String,
    enum: ['Easier', 'Average', 'Harder']
  },
  connectivity: Number,
  averagePathLength: Number,
  solutionLength: Number,
  start: {
    x: {
      ...RequiredNumber,
      default: 1
    },
    y: {
      ...RequiredNumber,
      default: 1
    }
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
    exits: Object,
    overpass: Boolean
  }]]
});

schema.pre('save', function(next) {

  const options = {
    width: this.dimensions.width,
    height: this.dimensions.height,
    startX: this.start.x,
    startY: this.start.y,
    difficulty: 'harder',
  };

  if(this.difficulty && this.end) {
    const err = new Error('Difficulty and end point are mutually exclusive options.');
    next(err);
  }
  if(this.end.x ? !this.end.y : this.end.y) {
    const err = new Error('Please provide a complete coordinate pair for the endpoint. You may also opt to leave it out altogether.');
    next(err);
  }
  
  if(this.difficulty) {
    options.difficulty = this.difficulty;
  }

  // Here is where we would select our algorithm. 
  const hexMaze = new HexMaze(options);
  return hexMaze;
});

module.exports = mongoose.model('Maze', schema);
