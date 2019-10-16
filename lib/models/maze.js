const mongoose = require('mongoose');
const { Schema } = mongoose;
const { HexesMaze } = require('../maze-classes/HexesMaze');
const { SquaresMaze } = require('../maze-classes/SquaresMaze');

const schema = new Schema({
  cellShape: {
    type: String,
    enum: ['Square', 'Hexagonal'],
    default: 'Square'
  },
  algorithm: {
    type: String,
    enum: ['Recursive Backtracker', 'Woven'],
    default: 'Recursive Backtracker'
  },
  dimensions: {
    height: {
      type: Number,
      default: 10
    },
    width: {
      type: Number,
      default: 10
    }
  },
  connectivity: Number,
  averagePathLength: Number,
  solutionLength: Number,
  start: {
    x: {
      type: Number,
      default: 1
    },
    y: {
      type: Number,
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
    cellShape: this.cellShape,
    algorithm: this.algorithm,
    endX: this.end.x,
    endY: this.end.y
  };

  if(this.end.x ? !this.end.y : this.end.y) {
    const err = new Error('Please provide a complete coordinate pair for the endpoint. You may also opt to leave it out altogether.');
    next(err);
  }
  let maze;

  switch(this.cellShape) {
    case 'Hexagonal' :
      maze = new HexesMaze(options);
      break;
    case 'Square' :
      maze = new SquaresMaze(options);
      break;
  }
  
  // console.log(maze.toString());


  addMazeDataToModel.bind(this)(maze);
  
  const err = this.validateSync();
  if(err){
    next(err);
  }
  next();
});

function addMazeDataToModel(maze) {
  Object.entries(maze.exportMazeModel()).forEach(entry => {
    this[entry[0]] = entry[1];
  });
}

module.exports = mongoose.model('Maze', schema);