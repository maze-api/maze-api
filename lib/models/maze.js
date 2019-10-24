// Mongoose models are classes, esentially.
// You could save a bunch of complexity by migrating
// all of your classes (and their methods) into
// your mongoose models. You can even use es6 class
// syntax if you want:
// https://mongoosejs.com/docs/4.x/docs/advanced_schemas.html
// https://github.com/Automattic/mongoose/issues/6850

const mongoose = require('mongoose');
const { Schema } = mongoose;
const algorithmRegistry = require('../algorithms/registry');
const { finalizeMaze } = require('../maze-classes/maze-methods/finalize-maze');
const { validAlgosByCellShape } = require('../maze-classes/Maze');

const schema = new Schema({
  cellShape: {
    type: String,
    enum: ['Square', 'Hexagonal'],
    default: 'Square'
  },
  algorithm: {
    type: String,
    default: 'Recursive Backtracker',
    validate: {
      validator: function (val) {
        return algorithmRegistry[this.cellShape].hasOwnProperty(this.algorithm);
      }
    }
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
    type: {
      x: {
        type: Number,
        default: 1
      },
      y: {
        type: Number,
        default: 1
      }
    },
    validate: {
      validator: function (val) {
        return (val.x <= this.dimensions.width || val.y <= this.dimensions.height)
          || (val.x === this.end.x && val.y === this.end.y);
      },
      message: () => `Your start coordinates are not valid coordinates for the dimensions of this maze.`
    }
  },
  end: {
    type: {
      x: Number,
      y: Number
    },
    validate: {
      validator: function (val) {
        return !val.x || (val.x && val.y);
      }
    }
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
}, {
  discriminatorKey: 'cellShape'
});

schema.pre('save', function (next) {
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

  // continue adding these conditions as validators
  if (this.end.x > this.dimensions.width || this.end.y > this.dimensions.height) {
    const err = new Error('Your end coordinates are not valid coordinates for the dimensions of this maze.');
    next(err);
  }

  if (!validAlgosByCellShape[this.cellShape].includes(this.algorithm)) {
    const err = new Error('Your chosen algorithm is not valid in combination your selected cellShape.');
    next(err);
  }

  // this part is handled automatically by the discriminator
  // and its post validate function.
  // at least the make cells part
  // let maze;
  // switch (this.cellShape) {
  //   case 'Hexagonal':
  //     maze = new HexesMaze(options);
  //     break;
  //   case 'Square':
  //     maze = new SquaresMaze(options);
  //     break;
  // }

  algorithmRegistry[this.cellShape][this.algorithm].bind(this)();
  finalizeMaze.bind(this)();
  addMazeDataToModel.bind(this)(maze);

  // no need to store the result of validateSync in a const
  // it either returns an error or undefined
  next(this.validateSync());
});

function addMazeDataToModel(maze) {
  Object.entries(maze.exportMazeModel()).forEach(entry => {
    this[entry[0]] = entry[1];
  });
}

module.exports = mongoose.model('Maze', schema);
