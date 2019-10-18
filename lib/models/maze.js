const mongoose = require('mongoose');
const { Schema } = mongoose;
const { HexesMaze } = require('../maze-classes/HexesMaze');
const { SquaresMaze } = require('../maze-classes/SquaresMaze');
const { validAlgosByCellShape } = require('../maze-classes/Maze');

const schema = new Schema({
  cellShape: {
    type: String,
    enum: ['Square', 'Hexagonal'],
    default: 'Square'
  },
  algorithm: {
    type: String,
    enum: ['Recursive Backtracker', 'Woven', 'Growing Tree', 'Prims'],
    default: 'Recursive Backtracker'
  },
  dimensions: {
    height: {
      type: Number,
      default: 10,
      min: 2
    },
    width: {
      type: Number,
      default: 10,
      min: 2
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
  cellMap: [{
    coordinates: {
      x: Number,
      y: Number
    },
    exits: Object,
    overpass: Boolean
  }],
  displayString: {
    type: String
  },
  displayStringWithSolutionPath: {
    type: String
  }
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

  if(this.start.x > this.dimensions.width || this.start.y > this.dimensions.height) {
    const err = new Error('Your start coordinates are not valid coordinates for the dimensions of this maze.');
    next(err);
  }

  if(this.start.x === this.end.x && this.start.y === this.end.y) {
    const err = new Error('Your start and end coordinates are the same. You may opt to omit the end coordinates and they will be chosen automatically.');
    next(err);
  }

  if(this.end.x ? !this.end.y : this.end.y) {
    const err = new Error('Please provide a complete coordinate pair for the endpoint. You may also opt to leave it out altogether.');
    next(err);
  }

  if(this.end.x > this.dimensions.width || this.end.y > this.dimensions.height) {
    const err = new Error('Your end coordinates are not valid coordinates for the dimensions of this maze.');
    next(err);
  }

  if(!validAlgosByCellShape[this.cellShape].includes(this.algorithm)) {
    const err = new Error('Your chosen algorithm is not valid in combination your selected cellShape.');
    next(err);
  }

  let maze;
  switch(this.cellShape) {
    case 'Hexagonal':
      maze = new HexesMaze(options);
      break;
    case 'Square':
      maze = new SquaresMaze(options);
      break;
  }

  addMazeDataToModel.bind(this)(maze);

  const err = this.validateSync();

  /* istanbul ignore next */
  if(err) next(err);

  next();
});

function addMazeDataToModel(maze) {
  Object.entries(maze.exportMazeModel()).forEach(entry => {
    this[entry[0]] = entry[1];
  });
}

module.exports = mongoose.model('Maze', schema);